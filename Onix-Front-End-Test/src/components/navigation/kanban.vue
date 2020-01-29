<template lang="pug">
  section
    h3 Kanban
    //- tasks
    div( class="table_wrapper")
      kanbanTable(
        v-for="(columnName, n) in tableStatus" :key="n"
        v-bind:tableId="n"
        v-bind:title="columnName"
        v-bind:data="formatedData[n]"
        v-on:card-drop="cardDrop"
      )
        
      //- table(v-for='(header, n) in tasks' :key='n')
      //-   thead
      //-     td(colspan='4' class='task-title') {{header.title}}
      //-   tbody
      //-     tr
      //-       td
      //-       //- task-status names
      //-       td(v-for='(status, m) in tableColumns' :key='m' :class="'task_status__' + status" class='task-header') {{status}}
      //-     //- sub-tasks
      //-     tr(v-for='(element, i) in header.subtasks' :key='i')
      //-       td {{element.time}}
      //-       //- texts and statuses
      //-       td(v-for='status, j in tableColumns' :key='j' 
      //-         v-if="element.status === status" draggable="true" @dragstart="dragstart" @click="toggleModal" :class="'id'+n+i+j" ) {{element.description}}
      //-       td(v-else @dragover.prevent @dragenter='enter' @dragleave='leave' @drop="drop" :class="'id'+n+i+j" ) {{''}}
    //- taskModal( v-bind:editTask="modal" v-bind:clickedTask="clickedTask" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  //import { TasksInterface } from '@/interfaces/TasksInterface';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTasks } from '@/store/database';
  import taskModal from '../modal/TaskModal.vue';
  import kanbanTable from '../kanbanTable/kanbanTable.vue'

  @Component({components: {taskModal, kanbanTable}})
  export default class Kanban extends Vue {
    tableStatus: Object;
    formatedData: {todo: Object[], inprogress: Object[], done: Object[]};
    //dragging: number[];
    modal: boolean;

    //clickedTask: number[];
    //dateToday: Object;
    
    constructor() {
      super();
      this.tableStatus = {todo: "To do", inprogress: 'In progress', done: 'Done'};
      this.formatedData = {todo: [], inprogress: [], done: []};
      //this.dragging = [];
      this.modal = false;
      //this.clickedTask = [];
      //this.dateToday = this.getDate();
    }

    /*get tasks from the store*/
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTasks);
      this.prepareData(this.tasks);
    }

    cardDrop(tableId: string, id: number): void {
    
      if(this.tasks[id].status == tableId) {
        return //if card dropped to the same table - do nothing
      }
      this.tasks[id].status = tableId;
      this.prepareData(this.tasks);
    }
    /* prepare data into mount in tables by statuses */
    prepareData(data: TasksInterface[]) {
      const keys = Object.keys(this.tableStatus);
      this.formatedData = {todo: [], inprogress: [], done: []};
      data.map( e => {
        switch (e.status) {
          case keys[0]: this.formatedData.todo.push(e); //todo table
          break;
          case keys[1]: this.formatedData.inprogress.push(e); //inpropgress table
          break;
          default: this.formatedData.done.push(e); //done table
          break;
        }
      });
    }
    // getDate(): Object {
    //   const today = new Date();
    //   return { 
    //     year: today.getFullYear(),
    //     month: today.getMonth() + 1,
    //     day: today.getDate(),
    //     time: today.getHours(),
    //     minutes: today.getMinutes()
    //   }
    // }

    // dragstart(event: any) {
    //   const className = event.target.className;
    //   if(className !== undefined) {
    //     this.dragging = this.stringToArray(className);
    //   }
    // }
    // /* n: task, i: subtask, j: status (indexes) */
    // drop(event:any): void {
    //   const drop = this.stringToArray(event.target.className);

    //   /* if user try to drop Done task to Todo - prevent it */
    //   if(drop[2] === 0 && this.dragging[2] === 2) {
    //     event.target.style.background = "";
    //     return;
    //   }
      
    //   /* if task(drop point 'id') in the same row with dragging task('dragging') - make drop*/
    //   if( this.inSameRow(drop, this.dragging) ) {
    //     this.changeStatus(this.dragging, drop[2]);
    //   }
    //   event.target.style.background = "";
    // }
    // /* change background of hovered task */
    // enter(event: any) {
    //   const drop = this.stringToArray(event.target.className);
    //   if( this.inSameRow(drop, this.dragging) ) {
    //     event.target.style.background = "#eee";
    //   }
    // }
    // leave(event: any) {
    //   event.target.style.background = "";
    // }
    /*convert class name with id000 to array of [0,0,0] */
    // stringToArray(name: string): number[] {
    //   return name.slice(2).split('').map( (item: string) => parseInt(item, 10) );
    // }

    // /* if task(drop point 'id') in the same row with dragging task('dragging') - make drop*/
    // inSameRow(taskId: number[], dropPoint: number[]) {
    //   return (taskId[0] === dropPoint[0] && taskId[1] === dropPoint[1]);
    // }
    // /* change status of the current cask in this.tasks Object */
    // changeStatus(oldStatus: number[], newStatus: number) {
    //   this.tasks[oldStatus[0]].subtasks[oldStatus[1]].status = this.tableColumns[newStatus];
    // }

    // toggleModal(event : any) {
    //   this.modal = !this.modal;

    //   if(this.modal) { //also get task id [0,0,0]
    //     this.clickedTask = this.stringToArray(event.target.className);
    //   }
    // }
  }
</script>

<style lang="scss">
  h3 {
    margin: 40px 32px 18px;
  }
  .table_wrapper {
    display: flex;
    flex-wrap: nowrap;
    align-self: center;
    align-items: flex-start;
  }

  table {
    //border-collapse: collapse;
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
  .task-title {
    text-align: center;
    padding: 30px 0 10px 0;
    text-transform: uppercase;
    opacity: 0.5;
    font-size: $secondFontSize;
    font-weight: bold;
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
</style>