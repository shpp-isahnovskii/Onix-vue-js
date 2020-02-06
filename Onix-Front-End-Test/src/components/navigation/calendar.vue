<template lang="pug">
  section
    h3 Calendar
    .calendar_wrapper
      div {{year}}
      div {{fullMonthName}}
      table
        tr
          //- header
          th(v-for="(day, i) in daysInWeek" v-bind:key="i") {{day}}
        tr
          //- body
          tr(v-for="(n) in rows" v-bind:key="n")
            td(v-for="day in daysInWeek.length")
              span(v-if="dayCounter(n, day) <=0 || dayCounter(n, day) >=lastDay") -
              span(v-else) {{dayCounter(n, day)}}
        
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';

  @Component
  export default class Calendar extends Vue {
    daysInWeek: string[];
    timeNow: Date;
    counter: number;

    constructor() {
      super();
      this.daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      this.timeNow = new Date();
      this.counter = 0;
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
    /* return current month value, used for programming */
    get shortMonthName(): number {
      return this.timeNow.getMonth();
    }
    /* means day of the week */
    get startDay(): number {
      return (new Date(this.year, this.shortMonthName, 1)).getDay();
    }
    /* last day, means number */
    get lastDay(): number {
      return (new Date(this.year, this.shortMonthName + 1, 0)).getDate();
    }
    /* this month name user see */
    get fullMonthName(): string {
      return this.timeNow.toLocaleString('default', { month: 'long' });
    }
    /* get amount of rows what I need for the table */
    get rows(): number {
      return Math.ceil( (this.startDay - 1 + this.lastDay) / 7 );
    }
    dayCounter(increment: number, thisDay: number ): number {
      return ( 7 * (increment - 1) + thisDay - this.startDay )
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