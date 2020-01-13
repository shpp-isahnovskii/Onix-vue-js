<template lang="pug">
  section
    h3 Kanban
    table
      tr(v-for='(element, i) in parsedData' :key='i') 
        td {{i}}
        td(v-for='(task, n) in element' :key='n') {{task}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { EventBusTasks } from '@/main.ts';

  
  @Component
  export default class Kanban extends Vue {
    tasks: any;
    parsedData: any;
    taskStatuses: string[];
    constructor() {
      super();
      this.tasks = {};
      this.parsedData = {};
      this.taskStatuses = ['todo', 'inprogress', 'done'];
      this.tasks = [
        { title: 'wake up', task: { description: 'Making bed.', time: '7.00AM', status: 'todo'}},
        { title: 'wake up', task: { description: 'Washing face.', time: '7.05AM', status: 'todo'}},
        { title: 'wake up', task: { description: 'Drinking a pint of lemon water.', time: '7.10AM', status: 'todo'}},
        { title: 'wake up', task: { description: 'Making breakfast.', time: '7.15AM', status: 'todo'}},
        { title: 'wake up', task: { description: 'Reviewing my goals.', time: '7.45AM', status: 'todo'}},
        { title: 'wake up', task: { description: 'Writing down two to four important tasks for the day.', time: '7.50AM', status: 'todo'}},

        { title: 'go to the work', task: { description: 'Suit up.', time: '8.00AM', status: 'todo'}},
        { title: 'go to the work', task: { description: 'Go out.', time: '8.10AM', status: 'todo'}},
        { title: 'go to the work', task: { description: 'Driving to the office.', time: '8.15AM', status: 'todo'}},
        { title: 'go to the work', task: { description: 'Talk to the manager.', time: '8.45AM', status: 'todo'}},
        { title: 'go to the work', task: { description: 'Planing work day.', time: '8.50AM', status: 'todo'}},
        { title: 'go to the work', task: { description: 'Work hard or easy.', time: '9.00AM', status: 'todo'}},
      ];
    }
    created() {
      //EventBusTasks.$emit('get-tasks');
      EventBusTasks.$on('tasks-refresh', (e: TasksInterface) => {
      this.tasks = e;
      //eslint-disable-next-line no-console
      //console.log(Object.keys(e));
      EventBusTasks.$off('tasks-refresh');
      });
    }
  }
</script>