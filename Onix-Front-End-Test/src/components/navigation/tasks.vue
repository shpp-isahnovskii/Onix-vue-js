<template lang="pug">
  section
    div
      button(class="section-button" v-on:click="toggleModal()") Add new task
    transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
      //- outer forEach
      div(v-for='(task, i) in tasks', v-bind:key='i')
        //- inner forEach
        h3 {{dateFormating(task.title)}}
        transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
          .article(v-for='(subtask, j) in task.subtasks', v-bind:key='j' ref="tasksRef")
            p {{subtask.description}}
              .article__time 
                span(class="article_time__text") {{subtask.time}}
                span(class="article__remove")
                  div(v-on:click="remove(i, j)") x
                button(class='article-button__status' v-on:click="changeTaskStatus(i, j, subtask.status)") {{subtask.status}}
    taskModal( v-bind:addTask="modal" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TasksInterface } from '@/interfaces/TasksInterface';
import { dataTask, userData } from '@/store/database';
import taskModal from '../modal/TaskModal.vue';

@Component({ components: { taskModal }})
export default class Tasks extends Vue {
  taskStatuses: string[];
  modal: boolean;
  $refs!: {
    tasksRef : HTMLFormElement;
  }
  constructor() {
    super();
    this.taskStatuses = ['todo', 'inprogress', 'done'];
    this.modal = false;
  }
  get tasks() : TasksInterface[] {
    return this.$store.getters.getTasks;
  }
  /* show or hide modal window 'add new task' */
  toggleModal() {
    this.modal = !this.modal;
    if(this.modal) {
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
  /* remove Task */
  remove(taskIndex: number, subtaskIndex: number) {
    Vue.delete(this.tasks[taskIndex].subtasks, subtaskIndex);
    if(this.tasks[taskIndex].subtasks.length === 0) { //remove task if no subtasks inside
      Vue.delete(this.tasks, taskIndex);
    }
    this.reduceTasksCounter();
  }
  /* sidebar menu counter -1 */
  reduceTasksCounter() : void {
    userData.tasks.open--;
    userData.tasks.closed++;
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
  /* */
  dateFormating(date: string) {
    return date.split("-").reverse().join('.');
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
    font-size: 20px;
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
  p {
    max-width: 480px;
    overflow-wrap: break-word;
    background-color: #f7f7f7;
    border-radius: 4px;
    border-left: 10px solid #f7f7f7;
  }
  .article__time {
    .article_time__text {
      margin-left: 12px;
    }
    .article__remove {
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
    .article__remove:hover {
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





