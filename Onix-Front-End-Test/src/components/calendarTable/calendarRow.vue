<template lang="pug">
  tr 
    calendarCell(v-for="i in week" v-bind:key="i"
    v-bind:day="shift(nDay(row, i))"
    v-bind:firstDay="mFirstDay"
    v-bind:lastDay="mLastDay") 
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
    //@Prop({default: undefined}) staticToday !: Date;
    //@Prop({default: undefined}) tasks !:TasksInterface[];

    get week() {
      return 7;
    }
    nDay( row: number, cell: number) {
      return (row - 1) * 7 + cell;
    }
    shift(day: number) {
      return day - this.mFirstDay; 
    }
    // /* Used for loop through all tasks and filtring all tasks for this day in current table cell*/
    // filteredTasks( day: number) {
    //   return this.tasks.filter( (e: TasksInterface) => ( (new Date(e.date).getDate() === this.staticToday.getDate()) ) )
    // }
  }
</script>

<style lang="scss">

</style>