<template lang="pug">
  section
    h3 Kanban
    div {{tasks}}
    div {{a}}
    table
      thead
        th(v-for='(header, index) in taskStatuses' :key='index') {{header}}


</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { EventBusTasks } from '@/main.ts';

  
  @Component
  export default class Kanban extends Vue {
    tasks: TasksInterface;
    a: string;
    taskStatuses: string[];
    constructor() {
      super();
      this.tasks = {};
      this.a ='b';
      this.taskStatuses = ['todo', 'inprogress', 'done'];
      this.tasks = {
      'task example': 
      {
        '7.00AM': { text: 'Do something..', status: 'todo' },
      },
    };
    }
    created() {
      //EventBusTasks.$emit('get-tasks');
      EventBusTasks.$on('tasks-refresh', (e: TasksInterface) => {
      this.tasks = e;
      //this.a = 'a'
      //eslint-disable-next-line no-console
      console.log(Object.keys(e));
      EventBusTasks.$off('tasks-refresh');
      });
    }
  }
</script>