<template lang="pug">
  section
    div
      button(class="section-button" v-on:click="toggleModal()") Add new task

    //- toggle window with form
    .modal-window( v-if="addTask" )
      .modal-overlay(v-on:click="toggleModal()")
      .form-wrapper
        form(class='modal-task-form' @submit.prevent="adding(taskHeader, taskText, taskTime)")
          .header__wrapper
            input(type="text" v-model="taskHeader" placeholder="Task Title.." class="task__header")
          .time__wrapper time: {{validate}}
            input(type='time' v-model="taskTime" placeholder="set time.." class="task__time")
          textarea(rows="12" v-model="taskText" placeholder="Task text here.." class="task__text")
          .task_btn__wrapper
            button(type='submit' class='task__btn btn__submit') Submit
            button(type='button' class='task__btn btn__cancel' v-on:click="toggleModal()") Cancel
    //- end of toggle window

    transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
      //- outer forEach
      div(v-for='(task, i) in tasks', v-bind:key='i')
        //- inner forEach
        h3 {{task.title}}
        transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
          .article(v-for='(subtask, j) in task.subtasks', v-bind:key='j' ref="tasksRef")
            p {{subtask.description}}
              .article__time {{ subtask.time }}
                span
                  div(v-on:click="remove(i, j)") x
                button(class='article-button__status' v-on:click="changeTaskStatus(i, j, subtask.status)") {{subtask.status}}
</template>

<script lang="ts">
import { TasksInterface } from '../../interfaces/TasksInterface';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { dataTask, userData } from '@/store/database';

@Component
export default class Tasks extends Vue {
  taskTime: string;
  taskText: string;
  taskHeader: string;
  taskStatuses: string[];
  addTask: boolean;
  $refs!: {
    tasksRef : HTMLFormElement
  }
  constructor() {
    super();
    this.taskTime = '';
    this.taskText = '';
    this.taskHeader ='';
    this.taskStatuses = ['todo', 'inprogress', 'done'];
    this.addTask = false;
  }
  get tasks() : TasksInterface[] {
    return this.$store.getters.getTasks;
  }
  /* show or hide modal window 'add new task' */
  toggleModal() {
    this.addTask = !this.addTask;
    if(this.addTask) {
      this.resetFormFields();
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }
  created() {
    this.$store.dispatch('loadTasks', dataTask);
  }
  mounted() {
    this.makeWave();
  }
  /*init wave for once*/
  makeWave() {
    this.$root.$on('make-wave', () => {
      if(this.tasks.length !== 0) {
        this.waveAnimation(this.$refs.tasksRef);
      }
    });
  }
  /* add wave animation to tasks array */
  waveAnimation(refs: HTMLFormElement) {
    //$refs example: https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs
    refs.forEach( (element: HTMLFormElement, index: number) => {
      setTimeout( () => element.classList.add('tasks-wave__animation'), 80 * (index) + 800);
    });
  }
  /* sidebar menu counter +1 */
  increaseTasksCounter() : void {
    userData.tasks.open++;
  }
  /* sidebar menu counter -1 */
  reduceTasksCounter() : void {
    userData.tasks.open--;
    userData.tasks.closed++;
  }
  /* adding new subtask, change subtask with same time, or create new task with new title  */
  adding(title:string, text: string, time: string) {
    if( !title || !text || !time ) {
      window.alert("please, input something in the task message and set the time");
    } else {
      const convertedTime : string = this.timeConvertAMPM(time);
      title = title.toLowerCase();

      /* find task  */
      const titleIndex : number = this.tasks.findIndex( e => e.title === title);
      if(titleIndex !== -1) {

        /* find time in subtasks */
        const timeIndex : number = this.tasks[titleIndex].subtasks.findIndex( e => e.time === convertedTime);
        if(timeIndex !== -1) {
          Vue.set(this.tasks[titleIndex].subtasks, timeIndex , {description: text, time: convertedTime, status: 'todo'}); //refresh task with the same time
        } else {
          Vue.set(this.tasks[titleIndex].subtasks, this.tasks[titleIndex].subtasks.length, 
            {description: text, time: convertedTime, status: 'todo'}); //add new time to current existing task
            this.increaseTasksCounter();
        }
      } else {
        Vue.set(this.tasks, this.tasks.length, {title: title , 
          subtasks: [{description: text, time: convertedTime, status: 'todo'}]}); //add absolutely new task
          this.increaseTasksCounter();
      }
      this.resetFormFields();
      this.toggleModal();
    }
  }
  /* Reset all input values for the task form */
  resetFormFields(){
    this.taskHeader = '';
    this.taskTime = '';
    this.taskText = '';
  }
  /* convert time from 24 to 12AM/PM */
  timeConvertAMPM(time: any) {
    //24 to 12 - get example from here: https://medium.com/front-end-weekly/how-to-convert-24-hours-format-to-12-hours-in-javascript-ca19dfd7419d
      time = time.split(':');
      time[1] += time[0] >= 12 ? 'PM' : 'AM';
      time[0] = time[0] % 12 || 12;
      return time.join('.');
  }
  /* remove Task */
  remove(taskIndex: number, subtaskIndex: number) {
    Vue.delete(this.tasks[taskIndex].subtasks, subtaskIndex);
    if(this.tasks[taskIndex].subtasks.length === 0) { //remove task if no subtasks inside
      Vue.delete(this.tasks, taskIndex);
    }
    this.reduceTasksCounter();
  }
  /* change status: todo inprogress or done */
  changeTaskStatus(index: number, subindex: number, curStatus: string) {
    Vue.set(this.tasks[index].subtasks[subindex], 'status',  this.setNextStatus(curStatus));
  }
  setNextStatus(status: string): string {
    const statuses = this.taskStatuses;
    let result = '';
    switch (status) {
      case statuses[0]: return statuses[1];
      case statuses[1]: return statuses[2];
      default: return statuses[0];
    }
  }
  /* add blink animation */
  addBlinkAnimation() {
    setTimeout( ()=> this.$refs.tasksRef[this.$refs.tasksRef.length - 1].classList.add('task-blink__animation'), 1000 );
  }
}
</script>

<style lang="scss" scoped>
  .tasks-list-enter-active, .tasks-list-leave-active {
    transition: opacity 1s, transform 1s;
  }
  .tasks-list-enter, .tasks-list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  //blink
  .task-blink__animation {
    animation-name: thisTaskBlink;
    animation-duration: 1.7s,
  }
  @keyframes thisTaskBlink {
  from {opacity: 1;}
  25%  {opacity: 0.5;}
  50%  {opacity: 1;}
  75%  {opacity: 0.5;}
  to   {opacity: 1;}
  }
  //text scale
  .tasks-wave__animation {
    animation-name: thisTasksAnimation;
    animation-duration: 0.4s,
  }
  @keyframes thisTasksAnimation {
  from {font-size: 1.0em;}
  50%  {font-size: 1.04em;}
  to {font-size: 1.0em;}
  }
  h3 {
    margin: 20px 32px 18px;
  }
  .article {
    margin: 24px 26px 0px 34px;
    p {
      padding-top: 4px;
    }
  }
  .article:last-child {
    margin-bottom: 40px;
  }
  .fade-enter-active, .fade-leave-active {
  transition: all .2s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active {
    transition-delay: .2s;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: gray;
    z-index: 10;
    cursor: pointer;
  }
  .form-wrapper {
    position: fixed;
    width: 600px;
    height: 420px;
    top: 100px;
    background-color: white;
    border-radius: 10px;
    z-index: 11;
  }
  .modal-task-form {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 16px 26px 16px 34px;
    
    .task__header, .task__text, .task__time {
      font-size: 16px;
      outline: none;
      border: none;
    }
    .task__header {
      border-bottom: 2px dotted silver;
      padding-bottom: 10px;
    }
    .header__wrapper {
      margin: 10px 0;
    }
    .task__header {
      max-width: 320px;
    }
    .task__text {
      resize: none;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .task__header, .task__text {
      padding-left: 4px;
    }
    .time__wrapper {
      position: relative; 
      color: #131313;
      margin-bottom: 10px;
    }
  }
  .task_btn__wrapper {
    align-self: flex-end;
    .task__btn {
      display: inline-block;
      border: none;
      color: white;
      text-decoration: none;
      font-size: 18px;
      padding: 10px 12px;
      border-radius: 4px;
      margin: 20px 0 20px 10px;
      font-size: 14px;
      transition: background-color 0.5s;
      &.btn__submit {
        background-color: rgb(140, 223, 142);
        &:hover {
          background-color: rgb(98, 218, 100);
        }
      }
      &.btn__cancel {
        background-color: rgb(223, 140, 140);
        &:hover {
          background-color: rgb(214, 106, 106);
        }
      }
      &:hover {
      cursor: pointer;
      }
    }
  }
  p {
    max-width: 480px;
    overflow-wrap: break-word;
    background-color: #f7f7f7;
    border-radius: 4px;
    border-left: 10px solid #f7f7f7;
  }
  .article__time {
    span {
      display: inline-block;
      position: relative;
      text-align: center;
      margin-left: 10px;
      width: 20px;
      border-radius: 50%;
      background-color: tomato;
      color: white;
      font-weight: bold;
      div {
        position: relative;
        top: -1px;
      }
    }
    span:hover {
      cursor: pointer;
    }
  }
  .section-button {
    margin: 30px 0 0 32px;
    height: 40px;
    padding: 0 15px;
    color: white;
    background-color: #66bb66;
    border: 1px solid #4cae4c;
  }
  .article-button__status {
    margin-top: 6px;
    display: block;
    width: 80px;
    position: relative;
    left: -2px;
  }
  .article-button__status, .section-button {
    border-radius: 4px;
    outline: none;
    transition: all 0.5s;
    &:hover {
    cursor: pointer;
    border-radius: 4px;
    }
  }
  .article-button__status:hover {
    background-color: #dbdbdb;
  }
  .section-button:hover {
    background-color: #449d44;
    border-color: #398439;
  }
</style>  





