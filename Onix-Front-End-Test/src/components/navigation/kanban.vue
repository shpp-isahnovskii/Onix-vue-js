<template lang="pug">
  section
    vc-date-picker( 
      value="Filter"
      mode="range"
      class="date-picker")
    .table_wrapper
      kanbanTable(
        v-for="(columnName, n) in tableStatus" :key="n"
        v-bind:tableId="n"
        v-bind:title="columnName"
        v-bind:data="prepareData(n)"
        v-on:card-drop="cardDrop"
        v-on:task-clicked="taskClicked"
      )
    taskModal( v-bind:editTask="modal" v-bind:clickedTask="clickedTask" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';
  import taskModal from '../modal/TaskModal.vue';
  import kanbanTable from '../kanbanTable/kanbanTable.vue';
  import TasksModInterface from '@/interfaces/TasksModInterface';

  @Component({components: {taskModal, kanbanTable}})
  export default class Kanban extends Vue {
    tableStatus: Object;
    modal: boolean;
    clickedTask: number;
    
    constructor() {
      super();
      this.tableStatus = {todo: "To do", inprogress: 'In progress', done: 'Done'};
      this.modal = false;
      this.clickedTask = 0;
    }

    /* set id-s to all tasks ---- think it be better way to use this function after main page load */
    get tasksMod(): TasksModInterface[] {
      let result: TasksModInterface[] = [];
      this.tasks.forEach( (el: TasksInterface, index: number) => {
        result.push(
          {
            title: el.title, 
            description: el.description, 
            date: el.date, 
            status: el.status, 
            id: index,
            expiration: this.getExpirationDate(el.date),
          }
        )
      });
      return result;
    }

    /* get tasks from the store */
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTasks);
    }

    cardDrop(tableId: string, id: number): void {
      if(this.tasks[id].status == tableId) {
        return //if card dropped to the same table - do nothing
      }
      if(this.tasks[id].status == "done" && tableId == "todo") {
        return // user can't dtop tasks from 
      }
      this.tasks[id].status = tableId;
    }
    /* prepare data by statuses */
    prepareData(status: string): TasksModInterface[] {
      return this.tasksMod.filter( e => e.status == status);
    }
    toggleModal() {
      this.modal = !this.modal;
    }
    taskClicked(id: number) {
      this.clickedTask = id;
      this.toggleModal();
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
  table {
    margin: 0 10px;
  }
  thead {
    th {
      padding-bottom: 12px;
    }
  }
  td {
    border: solid silver 1px;
    padding: 4px;
    border-radius: 4px;
  }
  td:not(:first-child) {
    width: 33.3%;
  }
  td:first-child {
    border: none;
  }
  .task-header {
    font-weight: bold;
    text-align: center;
    border: none;
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
  .date-picker {
    width: 200px;
  }
</style>