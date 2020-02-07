<template lang="pug">
  section
    h3 Calendar {{year}}
    .calendar_wrapper
      div(class="set_month")
        button( @click="monthShift(-1)" ) ⯇
        div {{fullMonthName}}
        button( @click="monthShift(1)" ) ⯈
      table
        tr
          //- t-header
          th(v-for="(day, i) in daysInWeek" v-bind:key="i") {{day}}
        tr
          //- t-body
          tr(v-for="(week) in rows" v-bind:key="week")
            td(v-for="day in daysInWeek.length" class="calendar-cell__wrapper") 
              div(v-if="changeDayCounter(week, day) <= 0 || changeDayCounter(week, day) > lastDay" class="day_invisible") {{week}} | {{day}}
              div(v-else class="calendar-cell") {{week}} | {{day}}
                div(class="day_val" v-bind:class="{ day_today : (changeDayCounter(week, day) == todayDay) }") {{changeDayCounter(week, day)}}
                div(v-for="(task, i) in filteredTasks(changeDayCounter(week, day))" class="day_task")
                  span(v-on:click="taskClicked(task.id)") {{task.title}}
    //taskModal( v-bind:editTask="modal" v-bind:id="clickedTask" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';

  import taskModal from '../modal/TaskModal.vue';

  @Component({components: {taskModal}})
  export default class Calendar extends Vue {
    daysInWeek: string[];
    time: Date;
    dayCounter: number;
    modal: boolean;
    clickedTask: number;

    constructor() {
      super();
      this.daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      this.time = new Date();
      this.dayCounter = 0;
      this.modal = false;
      this.clickedTask = 0;
    }
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTasks);
    }

    get timeNow() {
      return this.time;
    }
    monthShift(i: any) {
      this.time = new Date (this.timeNow.setMonth( this.timeNow.getMonth() + i));
    }

    @Watch('time')
    onChangeTime() {
      // eslint-disable-next-line no-console
      console.log(this.time);
    }

    /* Used for loop through all tasks and filtring all tasks for this day in current table cell*/
    filteredTasks( day: number) {
      return this.tasks.filter( (e: TasksInterface) => ( (new Date(e.date).getDate() === day) ) )
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
    get todayDay() : number {
      return (new Date).getDate();
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
    /* set dayCounter to current day. Can be negative or greater then days in the month, in this case table cell will be empty */
    changeDayCounter(increment: number, thisDay: number ): number {
      return ( 7 * (increment - 1) + thisDay - this.startDay + 1 )
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
  }
</script>

<style lang="scss">
  .calendar_wrapper {
    .set_month {
      display: flex;
      justify-content: center;
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
        border: 1px solid silver;
        vertical-align: top;
      }
      .calendar-cell__wrapper {
        .calendar-cell {
          width: 80px;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
        .day_invisible {
          visibility: hidden;
        }
        .day_val {
            border-left: 1px solid rgba(192, 192, 192, 0.5);
            border-bottom: 1px solid rgba(192, 192, 192, 0.5);
            width: 24px;
            height: 21px;
            border-radius: 0 0 0 50%;
            align-self: flex-end;
            text-align: right;
            margin-bottom: 4px;
        }
        .day_today {
          background-color: rgba(255, 197, 71, 0.126);
        }
        .day_task {
          text-align: left;
          margin: 2px 4px;
          background-color:#f0efee;
          border-radius: 5px;
          padding: 3px 5px;
          cursor: pointer;
          &:last-child {
            margin-bottom: 5px;
          }
        }
      }
    }
    margin-bottom: 40px;
  }
</style>