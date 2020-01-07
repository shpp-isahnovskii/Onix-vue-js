<template lang="pug">
  section
    h3 Today
    .inputText
      input(type="text" v-on:keyup.enter="adding(taskText, taskTime)" v-model="taskText" placeholder="type text here.." class="task__text")
      .time__before time:
        input(type='time' v-model="taskTime" placeholder="set time.." class="task__time")
      button(class='task__submit' v-on:click="adding(taskText, taskTime)") 
        div v
    transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
      .article(v-for='(task, n) in tasks', v-bind:key='task.text' ref="tasksRef")
        p {{task.text}}
          .article__time {{ task.time }}
            span
              div(v-on:click="remove(n)") x
</template>


<script lang="ts">
import { TasksInterface } from '../../interfaces/TasksInterface';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Tasks extends Vue {
  tasks: TasksInterface[];
  taskTime: string;
  taskText: string;
  $refs!: {
    tasksRef : HTMLFormElement;
  }

  constructor() {
    super();
    this.tasks = [];
    this.taskTime = '';
    this.taskText = '';
  }
  created() {
    this.tasks = [
      { text: 'Making bed.', time: '7.00AM' },
      { text: 'Washing face.', time: '7.05AM' },
      { text: 'Drinking a pint of lemon water.', time: '7.10AM' },
      { text: 'Maging breakfast', time: '7.15AM' },
      { text: 'Reviewing my goals.', time: '7.45AM' },
      { text: 'Writing down two to four important tasks for the day.', time: '7.50AM' }
    ];
  }
  
  mounted() {
    //get $refs example: https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs
    const refsOfTasks = this.$refs.tasksRef;
    refsOfTasks.forEach( (element: HTMLFormElement, index: number) => {
      setTimeout( () => element.classList.add('tasks-wave__animation'), 80 * (index) + 800);
    });
  }
  adding(text: string, time: any){
    if(text === '' || time === '') {
      window.alert("please, input something in the task message and set the time");
    } else {
      //24 to 12 - get example from here: https://medium.com/front-end-weekly/how-to-convert-24-hours-format-to-12-hours-in-javascript-ca19dfd7419d
      time = time.split(':');
      time[1] += time[0] >= 12 ? 'PM' : 'AM';
      time[0] = time[0] % 12 || 12;

      let existingTask = this.tasks.find( e => {
        return (e.text === text);
      });
      
      if(!existingTask) {
        this.tasks.push({text: text , time: time.join('.')});
      } else {
        alert('Taks with this name is already exist')
      }
    
      this.taskTime = '';
      this.taskText = '';

    }
  }
  remove(index: number) {
    this.tasks.splice(index, 1);
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

  .article {
    margin: 24px 26px 0px 34px;
  }
  .article:last-child {
    margin-bottom: 60px;
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
  .inputText {
    display: flex;
    flex-wrap: nowrap;
    margin: 16px 26px 16px 34px;
    
    .task__text, .task__time {
      font-size: 16px;
      outline: none;
      border: none;
    }
    .task__text {
      flex-grow: 4;
      border-bottom: 2px dotted silver;
      padding-bottom: 10px;
    }
    .time__before {
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
</style>





