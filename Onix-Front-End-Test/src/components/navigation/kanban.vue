<template lang="pug">
  section
    h3 Kanban
    table(v-for='(header, i) in tasks' :key='i')
      thead
        td(colspan='4' class='task-title') {{header.title}}
      tbody
        tr
          td
          td(v-for='(status, i) in taskStatus' :key='i' class='task-header') {{status}}
        tr(v-for='(element, i) in header.subtasks' :key='i')
          td {{element.time}}
          td(v-if="element.status === taskStatus[0]") {{element.description}}
          td(v-else) {{''}}
          td(v-if="element.status === taskStatus[1]") {{element.description}}
          td(v-else) {{''}}
          td(v-if="element.status === taskStatus[2]") {{element.description}}
          td(v-else) {{''}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTask } from '@/store/database';

  @Component
  export default class Kanban extends Vue {
    taskStatus: string[];
    constructor() {
      super();
      this.taskStatus = ['todo', 'inprogress', 'done'];
    }

    /*get tasks from the store*/
    get tasks() {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTask);
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
  .task-title {
    text-align: center;
    padding: 30px 0 10px 0;
    text-transform: uppercase;
    opacity: 0.5;
    font-size: $secondFontSize;
    font-weight: bold;
  }
  .task-header {
    font-weight: bold;
    text-align: center;
  }
</style>