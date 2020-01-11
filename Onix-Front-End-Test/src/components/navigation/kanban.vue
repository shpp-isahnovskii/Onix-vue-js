<template lang="pug">
  section
    h3 Kanban
      div {{tasks}}
      div {{a}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { EventBusTasks } from '@/main.ts';

  
  @Component
  export default class Kanban extends Vue {
    tasks: TasksInterface;
    a: string;
    constructor() {
      super();
      this.tasks = {};
      this.a ='b'
    }
    created() {
      EventBusTasks.$emit('get-tasks');
      EventBusTasks.$on('tasks-refresh', (e: TasksInterface) => {
      this.tasks = e;
      this.a = 'a'
      });
    }
  }
</script>