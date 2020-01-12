<template lang="pug">
  section
    form(class='task-form' @submit.prevent="adding(taskHeader, taskText, taskTime)")
      .header__wrapper
        input(type="text" v-model="taskHeader" placeholder="Task Title.." class="task__header")
      input(type="text" v-model="taskText" placeholder="Task text here.." class="task__text")
      .time__wrapper time:
        input(type='time' v-model="taskTime" placeholder="set time.." class="task__time")
      button(type='submit' class='task__submit') 
        div v
    transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
      //- outer forEach
      div(v-for='(taskObject, index) in tasks', v-bind:key='index')
        //- inner forEach
        h3 {{index}}
        transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
          .article(v-for='(task, time) in taskObject', v-bind:key='time' ref="tasksRef")
            p {{task.text}}
              .article__time {{ time }}
                span
                  div(v-on:click="remove(index, time)") x
                button(class='article-button__status' v-on:click="changeTaskStatus(index, time, task.status)") {{task.status}}
</template>

<script lang="ts">
import { TasksInterface } from '../../interfaces/TasksInterface';
import { Component, Vue } from 'vue-property-decorator';
import { EventBusTasks } from '@/main.ts'

@Component
export default class Tasks extends Vue {
  tasks: TasksInterface;
  taskTime: string;
  taskText: string;
  taskHeader: string;
  taskStatuses: string[];
  $refs!: {
    tasksRef : HTMLFormElement;
  }
  constructor() {
    super();
    this.tasks = {
      'asd': 
      {
        '7.00AM': { text: 'Making bed.', status: 'todo' },
      }
    }
    this.taskTime = '';
    this.taskText = '';
    this.taskHeader ='';
    this.taskStatuses = ['todo', 'inprogress', 'done'];
  }
  created() {
    this.tasks = {
      'wake up': 
      {
        '7.00AM': { text: 'Making bed.', status: 'todo' },
        '7.05AM': { text: 'Washing face.', status: 'todo' },
        '7.10AM': { text: 'Drinking a pint of lemon water.', status: 'todo' },
        '7.15AM': { text: 'Maging breakfast', status: 'todo' },
        '7.45AM': { text: 'Reviewing my goals.', status: 'todo' },
        '7.50AM': { text: 'Writing down two to four important tasks for the day.', status: 'todo' }
      },
      'go to the work': 
      {
        '8.00AM': { text: 'Suit up.', status: 'todo' },
        '8.10AM': { text: 'Go out.', status: 'todo' },
        '8.15AM': { text: 'Driving to the office.', status: 'todo' },
        '8.45AM': { text: 'Talk to the manager.', status: 'todo' },
        '8.50AM': { text: 'Planning work day.', status: 'todo' },
        '9.00AM': { text: 'Work hard or easy.', status: 'todo' }
      }
    };
    this.setTasks();
    //EventBusTasks.$on('get-tasks', ()=> {
      this.refreshKanban();
    //});
  }
  mounted() {
    this.waveAnimation(this.$refs.tasksRef);
  }
  waveAnimation(refs: HTMLFormElement) {
    //$refs example: https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs
    refs.forEach( (element: HTMLFormElement, index: number) => {
      setTimeout( () => element.classList.add('tasks-wave__animation'), 80 * (index) + 800);
    });
  }
  refreshKanban(): void {
    EventBusTasks.$emit('tasks-refresh', this.tasks);
  }
  setTasks() {
    let counter: number = 0;
    Object.keys(this.tasks).forEach( e => {
      counter += (Object.keys(this.tasks[e]).length);
    });
    EventBusTasks.$emit('set-tasks-count', counter);
  }
  increaseTasksCounter() : void {
    EventBusTasks.$emit('tasks-counts-up');
  }
  reduceTasksCounter() : void {
    EventBusTasks.$emit('tasks-counts-down');
  }

  adding(header:string, text: string, time: string) {
    if( !header || !text || !time ) {
      window.alert("please, input something in the task message and set the time");
    } else {
      const t = this.timeConvertAMPM(time);
      header = header.toLowerCase();
      const headerExist = Object.entries(this.tasks).find(e => e[0] === header);
      if(headerExist) {
        Vue.set(this.tasks[header], t, {text:text, status:'todo'});
      } else {
        Vue.set(this.tasks, header, {[t]: {text:text, status:'todo'} } );
      }
      this.taskHeader = '';
      this.taskTime = '';
      this.taskText = '';
      this.increaseTasksCounter();
    }
  }
  timeConvertAMPM(time: any) {
    //24 to 12 - get example from here: https://medium.com/front-end-weekly/how-to-convert-24-hours-format-to-12-hours-in-javascript-ca19dfd7419d
      time = time.split(':');
      time[1] += time[0] >= 12 ? 'PM' : 'AM';
      time[0] = time[0] % 12 || 12;
      return time.join('.');
  }
  remove(name: string, index: string) {
    Vue.delete(this.tasks[name], index);
    if(Object.entries(this.tasks[name]).length === 0) { //remove header if no tasks inside
      Vue.delete(this.tasks, name);
    }
    this.reduceTasksCounter();
  }
  changeTaskStatus(header: string, time: string, curStatus: string) {
    Vue.set(this.tasks[header][time], 'status',  this.setNextStatus(curStatus));
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
  .task-form {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 26px 16px 34px;
    
    .task__header, .task__text, .task__time {
      font-size: 16px;
      outline: none;
      border: none;
    }
    .task__header, .task__text {
      border-bottom: 2px dotted silver;
      padding-bottom: 10px;
    }
    .header__wrapper {
      flex-basis: 100%;
      margin: 10px 0;
    }
    .task__header {
      max-width: 140px;
    }
    
    .task__text {
      flex-grow: 4;
    }
    .time__wrapper {
      position: relative;
      margin-left: 20px;
      color: #131313;
      flex-grow: 1;
    }
    .task__time {
      margin-left: 20px;
      }
    }
    .task__submit {
      background-color: rgb(140, 223, 142);
      border: none;
      color: white;
      text-decoration: none;
      font-size: 18px;
      width: 33px;
      border-radius: 50%;
      margin-left: auto;
      margin-right: 5px;
    }
    .task__submit:hover {
      cursor: pointer;
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
  .article-button__status {
    margin-top: 6px;
    border-radius: 4px;
    display: block;
    width: 80px;
    transition: all 1s;
    outline: none;
    position: relative;
    left: -2px;
  }
  .article-button__status:hover {
    cursor: pointer;
    background-color: #d6d6d6;
    border-radius: 4px;
  }
</style>





