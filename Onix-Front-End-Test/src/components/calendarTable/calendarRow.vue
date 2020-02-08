<template lang="pug">
  tr 
    calendarCell(v-for="i in week" v-bind:key="i"
    v-bind:day="shift(nDay(row, i))"
    v-bind:firstDay="mFirstDay"
    v-bind:lastDay="mLastDay") 
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import calendarCell from "./calendarCell.vue";

@Component({components:{calendarCell}})
  export default class CalendarRow extends Vue {
    @Prop({default: undefined}) row !:number;
    @Prop({default: undefined}) mFirstDay !:number;
    @Prop({default: undefined}) mLastDay !:number;

    get week() {
      return 7;
    }
    nDay( row: number, cell: number) {
      return (row - 1) * 7 + cell;
    }
    shift(day: number) {
      return day - this.mFirstDay; 
    }
    currentDay() {
      
    }
  }
</script>

<style lang="scss">

</style>