<template lang="pug">
  section
    h3 Kanban
    table
      thead
        tr
          th 
          th(v-for='(element, i) in taskStatus' :key='i') {{element}}
      tbody
        tr(v-for='(element, i) in tasks' :key='i')
          td {{element.task.time}}
          td(v-if="element.task.status === taskStatus[0]") {{element.task.description}}
          td(v-else) {{''}}
          td(v-if="element.task.status === taskStatus[1]") {{element.task.description}}
          td(v-else) {{''}}
          td(v-if="element.task.status === taskStatus[2]") {{element.task.description}}
          td(v-else) {{''}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { EventBusTasks } from '@/main.ts';

  
  @Component
  export default class Kanban extends Vue {
    tasks: any[];
    taskStatus: string[];
    constructor() {
      super();
      this.taskStatus = ['todo', 'inprogress', 'done'];
      this.tasks = [
        { title: 'wake up', task: { description: 'Making bed.', time: '7.00AM', status: 'done'}},
        { title: 'wake up', task: { description: 'Washing face.', time: '7.05AM', status: 'inprogress'}},
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
    created() { //-this code don't work
      //EventBusTasks.$emit('get-tasks');
      EventBusTasks.$on('tasks-refresh', (e: TasksInterface) => {
      //this.tasks = e;
      EventBusTasks.$off('tasks-refresh');
      });
    }
  }
</script>

<style lang="scss">
  h3 {
    margin: 40px 32px 18px;
  }
  table {
    border-collapse: collapse;
    margin: 0 10px;
  }
  thead {
    th {
      padding-bottom: 12px;
    }
  }
  td {
    border: solid silver 1px;
    padding: 4px;
  }
  td:not(:first-child) {
    width: 33.3%;
  }
  td:first-child {
    border: none;
  }
</style>