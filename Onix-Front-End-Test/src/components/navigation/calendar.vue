<template lang="pug">
  section
    h3 Calendar {{year}}
    .calendar_wrapper
      div(class="set_month")
        button( @click="monthShift(-1)" ) -
        div(class="calendar_month_name") {{fullMonthName}}
        button( @click="monthShift(1)" ) +
      table
        tr
          //- t-header
          th(v-for="(day, i) in daysInWeek" v-bind:key="i") {{day}}
          //- t-body
        calendarRow(v-for="row in rows" v-bind:key="row"
        v-bind:mLastDay="lastDay"
        v-bind:mFirstDay="firstDay"
        v-bind:row="row"
        v-bind:tasks="monthTasksFilter()"
        v-on:task-click="taskClicked")
    taskModal( v-bind:editTask="modal" v-bind:editing="false" v-bind:id="clickedTask" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';
  import calendarRow from '@/components/calendarTable/calendarRow.vue';
  import taskModal from '../modal/TaskModal.vue';

  @Component({components: {taskModal, calendarRow}})
  export default class Calendar extends Vue {
    daysInWeek: string[];
    dynamicDate: Date;

    modal: boolean;
    clickedTask: number;

    constructor() {
      super();
      this.daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      
      this.dynamicDate = this.staticDate; //date for month changing

      this.modal = false;
      this.clickedTask = 0;
    }
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTasks);
    }

    /* date for tasks filtring */
    get staticDate() {
      return new Date();
    }

    /* - ore + one month to the calendar */
    monthShift(i: any) {
      this.dynamicDate = new Date (this.dynamicDate.setMonth(this.dynamicDate.getMonth() + i));
    }

    /* return current year value */
    get year(): number {
      return this.dynamicDate.getFullYear();
    }
    /* this month name user see */
    get fullMonthName(): string {
      return this.dynamicDate.toLocaleString('default', { month: 'long' });
    }
    
    /* return current month in value 0,1,2.. */
    get monthNumber(): number {
      return this.dynamicDate.getMonth();
    }

    //--- month info ---
    /* means day of the week. Example: monday 0, wednesday 2*/
    get firstDay(): number {
      const day = new Date(this.year, this.monthNumber, 1).getDay();
      return day === 0 ? 6 : day - 1;
    }
    get todayDay() : number {
      return this.dynamicDate.getDate();
    }
    /* last day, means number */
    get lastDay(): number {
      return (new Date(this.year, this.monthNumber + 1, 0)).getDate();
    }
    //--- end month info ---

    /* get amount of rows what I need for the table */
    get rows(): number {
      return Math.ceil( (this.firstDay - 1 + this.lastDay) / 7 );
    }

    taskClicked(id: number) {
      this.clickedTask = id;
      this.toggleModal();
    }
    toggleModal() {
      this.modal = !this.modal;
      if(this.modal) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
    }
    /* Used for loop through all tasks and filtring all tasks for this day in current table cell*/
    monthTasksFilter() {
      return this.tasks.filter( (e: TasksInterface) => this.dynamicDate.toISOString().slice(0, 7) === e.date.slice(0, 7) );
    }
  }
</script>

<style lang="scss">
  .calendar_wrapper {
    .calendar_month_name {
      min-width: 90px;
      text-align: center;
    }
    .set_month {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      button {
        outline: none;
        border: none;
        border-radius: 5px;
        margin: 0 5px;
        font-size: 16px;
        background-color: #f8f8f8;
        cursor: pointer;
      }
    }
    margin: 0 auto;
    table {
      border-collapse: collapse;
      cursor: default;
      td {
        border: 2px solid silver;
        vertical-align: top;
      }
    }
    margin-bottom: 40px;
  }
</style>