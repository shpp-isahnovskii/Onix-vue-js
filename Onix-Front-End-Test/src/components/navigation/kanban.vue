<template lang="pug">
  section
    h3 Kanban
    //- tasks
    table(v-for='(header, n) in tasks' :key='n')
      thead
        td(colspan='4' class='task-title') {{header.title}}
      tbody
        tr
          td
          //- task-status names
          td(v-for='(status, m) in taskStatus' :key='m' class='task-header') {{status}}
        //- sub-tasks
        tr(v-for='(element, i) in header.subtasks' :key='i')
          td {{element.time}}
          //- texts and statuses
          td(v-for='status, j in taskStatus' :key='j' 
            v-if="element.status === status" draggable="true" @dragstart="dragstart" @click="toggleModal" :class="'id'+n+i+j") {{element.description}}
            td(v-else @dragover.prevent @dragenter='enter' @dragleave='leave' @drop="drop" :class="'id'+n+i+j") {{''}}
    taskModal(v-bind:showModal="modal" @hideModal="toggleModal()")
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import { dataTask } from '@/store/database';
  import taskModal from '@/components/modal/TaskModal.vue';

  @Component({components: {taskModal}})
  export default class Kanban extends Vue {
    taskStatus: string[];
    dragging: number[];
    modal: boolean;
    
    constructor() {
      super();
      this.taskStatus = ['todo', 'inprogress', 'done'];
      this.dragging = [];
      this.modal = false;
    }

    /*get tasks from the store*/
    get tasks() {
      return this.$store.getters.getTasks;
    }
    created() {
      this.$store.dispatch('loadTasks', dataTask);
    }
    dragstart(event: any) {
      const className = event.target.className;
      if(className !== undefined) {
        this.dragging = this.stringToArray(className);
      }
    }

    /* n: task, i: subtask, j: status (indexes) */
    drop(event:any): void {
      const drop = this.stringToArray(event.target.className);

      /* if user try to drop Done task to Todo - prevent it */
      if(drop[2] === 0 && this.dragging[2] === 2) {
        event.target.style.background = "";
        return;
      }
      
      /* if task(drop point 'id') in the same row with dragging task('dragging') - make drop*/
      if( this.inSameRow(drop, this.dragging) ) {
        this.changeStatus(this.dragging, drop[2]);
      }
      event.target.style.background = "";
    }
    /* change background of hovered task */
    enter(event: any) {
      const drop = this.stringToArray(event.target.className);
      if( this.inSameRow(drop, this.dragging) ) {
        event.target.style.background = "#eee";
      }
    }
    leave(event: any) {
      event.target.style.background = "";
    }
    /*convert class name with id000 to array of [0,0,0] */
    stringToArray(name: string): number[] {
      return name.slice(2).split('').map( (item: string) => parseInt(item, 10) );
    }

    /* if task(drop point 'id') in the same row with dragging task('dragging') - make drop*/
    inSameRow(taskId: number[], dropPoint: number[]) {
      return (taskId[0] === dropPoint[0] && taskId[1] === dropPoint[1]);
    }
    /* change status of the current cask in this.tasks Object */
    changeStatus(oldStatus: number[], newStatus: number) {
      this.tasks[oldStatus[0]].subtasks[oldStatus[1]].status = this.taskStatus[newStatus];
    }

    toggleModal() {
      this.modal = !this.modal;
    }
  }
</script>

<style lang="scss">
  h3 {
    margin: 40px 32px 18px;
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
  }
</style>