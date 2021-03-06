<template lang="pug">
  section
    form(v-on:submit.prevent="" class="kanban-search-form")
      div(class="name-picker")
        input(v-model="filtredText")
      div(class="date-picker")
        kanban-date-picker(v-model="filtredDates" :value="null" mode="range")
    .table_wrapper
      kanbanTable(
        v-for="(columnName, n) in tableStatus" :key="n"
        v-bind:tableId="n"
        v-bind:title="columnName"
        v-bind:data="globalFilter(tasksMod, n, filtredText, filtredDates)"
        v-on:card-drop="cardDrop"
        v-on:task-clicked="taskClicked"
      )
    taskModal( v-bind:editTask="modal" v-bind:id="clickedTask" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import taskModal from '../modal/TaskModal.vue';
  import kanbanTable from '../kanbanTable/kanbanTable.vue';
  import TasksModInterface from '@/interfaces/TasksModInterface';
  import VCalendar from 'v-calendar';

  Vue.use(VCalendar, { componentPrefix: "kanban" }); //add date-picker
  
  import { namespace } from 'vuex-class'
  const TaskStore = namespace('tasks');

  @Component({components: {taskModal, kanbanTable}})
  export default class Kanban extends Vue {
    @TaskStore.State('tasksData') tasks !: TasksInterface[];

    @TaskStore.Action("fetchChangeTask") fetchChangeTask !: Function;
    @TaskStore.Mutation('changeTaskData') changeTaskData !: Function;
    
    tableStatus: Object;
    modal: boolean;
    clickedTask: number;
    filtredDates: Object; // this object have 2 params {start: Date, end: Date}
    filtredText: string;
    
    constructor() {
      super();
      this.tableStatus = {todo: "To do", inprogress: 'In progress', done: 'Done'};
      this.modal = false;
      this.clickedTask = 0;
      this.filtredDates = {};
      this.filtredText = "";
    }

    /* set expiration date to the all tasks */
    get tasksMod(): TasksModInterface[] {
      let result: TasksModInterface[] = [];
      this.tasks.forEach( (el: TasksInterface) => {
        result.push(
          {
            title: el.title, 
            description: el.description, 
            date: el.date, 
            status: el.status, 
            id: el.id,
            expiration: this.getExpirationDate(el.date), //add this new value
          }
        )
      });
      return result;
    }

    async cardDrop(status: string, id: number) {
      const index = this.tasks.findIndex( e=> e.id == id);
      let task = this.tasks[index];
      if(task.status == status) {

        return //if card dropped to the same table - do nothing
      }
      if(task.status == "done" && status == "todo") {
        return // user can't drop tasks from done to todo
      }
      task.status = status;
      await this.fetchChangeTask(task).then((response: boolean) => {
        if(response) {
          this.changeTaskData(task);
        }
      });
    }
    /* global filter */
    globalFilter(array: TasksModInterface[], status: string, text: string, dates: any): TasksModInterface[] {
      return this.filterStatus(this.filterTitle(this.filterDate(array, dates), text), status)
    }
    /* filter data by statuses */
    filterStatus(array: TasksModInterface[], status: string): TasksModInterface[] {
      return array.filter( e => e.status == status);
    }
    /* filter data by input name */
    filterTitle(array: TasksModInterface[], name: string): TasksModInterface[] {
      return array.filter( e => e.title.indexOf(name) !== -1 );
    }
    /* filter data by date in range */
    filterDate(array: TasksModInterface[], datesRange: any): TasksModInterface[] {
      if(!datesRange || !datesRange.start) { //.start - object val from V-calendar date
        return array;
      }
      return array.filter( e => {
        const cardDate = new Date (new Date(e.date).toLocaleString().split(',')[0]); //remove hours and minutes from the date then rebuild it
        return ( (cardDate >= datesRange.start) && (cardDate <= datesRange.end) );
      });
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
    /* Returned value can be 2days and more, 1day, 0out of exp */
    getExpirationDate(date: string): number {
      const millisInDay : number = 86400000;
      const timeDifference = new Date (date).getTime() - Date.now();
      if(timeDifference > millisInDay) {
        return 2  //expiration more then 1 day
      }
      if(timeDifference > 0) { // 1 day expiration
        return 1
      }
      return 0 //out of expiration
    }
  }
</script>

<style lang="scss">
  h3 {
    margin: 40px 32px 18px;
  }
  .table_wrapper {
    margin-top: 20px;
    display: flex;
    flex-wrap: nowrap;
    align-self: center;
    align-items: flex-start;
  }
  .task_status__todo {
    background-color: rgb(250, 242, 242);
  }
  .task_status__inprogress {
    background-color: rgb(252, 252, 211);
  }
  .task_status__done {
    background-color: rgb(221, 255, 221);
  }
  .kanban-search-form {
    display: flex;
  }
  .name-picker, .date-picker {
    display: flex;
    margin: 10px 0 0 10px;
    height: 25px;
    &::before {
      position: relative;
      top: 4px;
      margin: 0 8px;
    }
  }
  .name-picker {
    input {
      display: inline-block;
      height: 19px;
      width: 175px;
      border-radius: 4px;
      border: 1px solid #cbd5e0;
      outline: none;
      padding: 8px 12px;
      font-size: 16px;
      &:focus {
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
      }
    }
    &::before {
      //Icons made by www.flaticon.com/authors/freepik
      content: url("../../assets/images/calendar/list.svg");
    }
  }
  .date-picker {
    &::before {
      //Icons made by www.flaticon.com/authors/freepik
      content: url("../../assets/images/calendar/date.svg");
    }
    width: 220px;
  }

</style>