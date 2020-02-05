<template lang="pug">
  section
    h3 Calendar
    .calendar_wrapper
      div {{year}}
      div {{fullMonth}}
      table
        tr
          th(v-for="(n, i) in week" v-bind:key="i") {{n}}
        tr
          td(v-for="(i) in lastDay" v-bind:key="i") {{i}}

        
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';

  @Component
  export default class Calendar extends Vue {
    week: string[];
    timeNow: Date;

    constructor() {
      super();
      this.week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      this.timeNow = new Date();
    }

    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTasks);
    }

    /* return current year value */
    get year(): number {
      return this.timeNow.getFullYear();
    }
    /* return current month value */
    get shortMonthName(): number {
      return this.timeNow.getMonth();
    }
    get firstDay(): number {
      return (new Date(this.year, this.shortMonthName, 1)).getDay();
    }
    get lastDay(): number {
      return (new Date(this.year, this.shortMonthName + 1, 0)).getDate();
    }
    get fullMonthName(): string {
      return this.timeNow.toLocaleString('default', { month: 'long' });
    }
  }
</script>

<style lang="scss">
  .calendar_wrapper {
    margin: 0 auto;
    table {
      td {
        border: 1px solid silver;
      }
    }
  }
  .calendar_table__header {
    border: 1px solid silver;
  }
</style>