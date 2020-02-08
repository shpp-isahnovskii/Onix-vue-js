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
          //- t-body
        calendarRow(v-for="row in rows" v-bind:key="row"
        v-bind:mLastDay="lastDay"
        v-bind:mFirstDay="firstDay"
        v-bind:row="row"
        v-bind:fullDate="staticToday")
            //td(v-for="day in daysInWeek.length" class="calendar-cell__wrapper") {{week}} | {{day}}

              //- div(v-if="changeDayCounter(week, day) <= 0 || changeDayCounter(week, day) > lastDay" class="day_invisible") {{week}} | {{day}}
              //- div(v-else class="calendar-cell") {{week}} | {{day}}
              //-   div(class="day_val" v-bind:class="{ day_today : (changeDayCounter(week, day) == todayDay) }") {{changeDayCounter(week, day)}}
              //-   div(v-for="(task, i) in filteredTasks(changeDayCounter(week, day))" class="day_task")
              //-     span(v-on:click="taskClicked(task.id)") {{task.title}}
    //taskModal( v-bind:editTask="modal" v-bind:id="clickedTask" v-on:hideModal="toggleModal()")
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
    staticToday: Date;
    todayForChange: Date;

    modal: boolean;
    clickedTask: number;

    constructor() {
      super();
      this.daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      this.staticToday = new Date();
      
      this.todayForChange = this.staticToday;
      
      this.modal = false;
      this.clickedTask = 0;
    }
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTasks);
    }

    // monthShift(i: any) {
    //   this.calendarDate = new Date (this.calendarDate.setMonth(this.calendarDate.getMonth() + i));
    // }

    // @Watch('time')
    // onChangeTime() {
    //   // eslint-disable-next-line no-console
    //   console.log(this.today);
    //   // eslint-disable-next-line no-console
    //   console.log(this.calendarDate + " " + " reactive");

    // }

    // /* Used for loop through all tasks and filtring all tasks for this day in current table cell*/
    // filteredTasks( day: number) {
    //   return this.tasks.filter( (e: TasksInterface) => ( (new Date(e.date).getDate() === day) ) )
    // }

    /* return current year value */
    get year(): number {
      return this.todayForChange.getFullYear();
    }
    /* this month name user see */
    get fullMonthName(): string {
      return this.todayForChange.toLocaleString('default', { month: 'long' });
    }
    
    /* return current month in value 0,1,2.. */
    get monthNumber(): number {
      return this.todayForChange.getMonth();
    }

    //--- month info ---
    /* means day of the week. Example: monday 0, wednesday 2*/
    get firstDay(): number {
      const day = new Date(this.year, this.monthNumber, 1).getDay();
      return day === 0 ? 6 : day - 1;
    }
    get todayDay() : number {
      return this.todayForChange.getDate();
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
    }
    margin-bottom: 40px;
  }
</style>