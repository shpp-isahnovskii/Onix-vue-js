<template lang="pug">
  tr 
    calendarCell(v-for="i in week" v-bind:key="i"
    v-bind:day="tableToFirstDay(nDay(row, i))"
    v-bind:firstDay="mFirstDay"
    v-bind:lastDay="mLastDay"
    v-bind:dailyTasks="dailyTasks( tableToFirstDay(nDay(row, i)) )"
    v-on:task-click="taskClickEmit"
    )
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { TasksInterface } from "@/interfaces/TasksInterface";
  import calendarCell from "./calendarCell.vue";

@Component({components:{calendarCell}})
  export default class CalendarRow extends Vue {
    @Prop({default: undefined}) row !:number;
    @Prop({default: undefined}) mFirstDay !:number;
    @Prop({default: undefined}) mLastDay !:number;
    @Prop({default: undefined}) tasks !:TasksInterface[];

    get week() {
      return 7;
    }
    /* convert current row and position to the date number 1-31 */
    nDay( row: number, cell: number) {
      return (row - 1) * 7 + cell;
    }
    /* shift table to first day position */
    tableToFirstDay(day: number) {
      return day - this.mFirstDay; 
    }
    /* filtring tasks for the current day */
    dailyTasks(day: number): TasksInterface[] {
      return this.tasks.filter( (e: TasksInterface)  => parseInt(e.date.slice(8,10)) === day )
    }
    taskClickEmit(id: number) {
      this.$emit("task-click", id)
    }
  }
</script>

<style lang="scss">

</style>