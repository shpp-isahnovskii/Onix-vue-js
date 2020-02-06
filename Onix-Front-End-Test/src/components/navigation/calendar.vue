<template lang="pug">
  section
    h3 Calendar
    .calendar_wrapper
      div {{year}}
      div {{fullMonthName}}
      table
        tr
          //- t-header
          th(v-for="(day, i) in daysInWeek" v-bind:key="i") {{day}}
        tr
          //- t-body
          tr(v-for="(week) in rows" v-bind:key="week")
            td(v-for="day in daysInWeek.length" class="calendar-cell__wrapper") {{changeDayCounter(week, day)}}
              div(v-if="dayCounter <=0 || dayCounter > lastDay" class="day_invisible") 
              div(v-else class="calendar-cell")
                div(class="day_val" v-bind:class="{ day_today : (dayCounter == todayDay) }") {{dayCounter}}
                div(v-for="(task, i) in filteredTasks(dayCounter)" class="day_task") 
                  span(v-on:click="taskClicked(task.id)") {{task.title}}
    taskModal( v-bind:editTask="modal" v-bind:id="clickedTask" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';

  import taskModal from '../modal/TaskModal.vue';

  @Component
  export default class Calendar extends Vue {
    daysInWeek: string[];
    timeNow: Date;
    dayCounter: number;
    modal: boolean;
    clickedTask: number;

    constructor() {
      super();
      this.daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      this.timeNow = new Date();
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

    /*  */
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
      return this.timeNow.getDate();
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
    changeDayCounter(increment: number, thisDay: number ): void {
      this.dayCounter = ( 7 * (increment - 1) + thisDay - this.startDay + 1 )
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