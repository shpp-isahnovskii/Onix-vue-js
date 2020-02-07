<template lang="pug">
  tr 
    calendarCell(v-for="day in week" v-bind:key="day" 
    v-bind:day="dayCounter()" 
    v-bind:lastday="monthInfo.lastday" 
    v-bind:today="false") 
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import calendarCell from "./calendarCell.vue";
  import CalendarMonthInfo from "@/interfaces/CalendarMonthInfo";

@Component({components:{calendarCell}})
  export default class CalendarRow extends Vue {
    @Prop({default: undefined}) row !:number;
    @Prop({default: undefined}) monthInfo !: CalendarMonthInfo;
    
    get week() {
      return 7;
    }
    /* set dayCounter to current day. Can be negative or greater then days in the month, in this case table cell will be empty */
    dayCounter(): number {
      return 1 - this.monthInfo.firstday--;
    }
    today(countedDay: number): any {
      return countedDay;
    }
  }
</script>

<style lang="scss">

</style>