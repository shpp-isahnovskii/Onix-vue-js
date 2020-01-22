<template lang="pug">
    .modal-window( v-if="showModal" )
      .modal-overlay(v-on:click="hideModal()")
      //- edit form
      .form-wrapper( v-if="editmode" )
        .task-header {{tasks[clickedTask[0]].title}}
          .task-time
            span Time: 
            input(type="date" class="task__time")
          .task-text
            span Description: 
            input(type='text' :value="tasks[clickedTask[0]].subtasks[clickedTask[1]].description")
        .btn-wrapper
          button(class="edit-btn" v-on:click='toggleEdit()') Cancel
      //- observer form
      .form-wrapper( v-else )
        .task-header {{tasks[clickedTask[0]].title}}
        .task-time
          span Time: 
          span {{tasks[clickedTask[0]].subtasks[clickedTask[1]].time}}
        .task-text 
          span Description: 
          div {{tasks[clickedTask[0]].subtasks[clickedTask[1]].description}}
        .btn-wrapper
          button(class="edit-btn" v-on:click='toggleEdit()') Edit

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { dataTask } from '@/store/database';

@Component
export default class TaskModal extends Vue {
  @Prop({default: false}) showModal !: boolean;
  @Prop({}) clickedTask !: number[];
  editmode: boolean;

  constructor() {
    super();
    this.editmode = false;
  }
  /*get tasks from the store*/
  get tasks() {
    return this.$store.getters.getTasks;
  }
  created() {
    this.$store.dispatch('loadTasks', dataTask);
  }
  toggleEdit() {
    this.editmode = !this.editmode;
  }

hideModal() {
  this.$emit('hideModal');
}
}
</script>


<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: gray;
    z-index: 10;
    cursor: pointer;
  }
  .form-wrapper {
  position: fixed;
  width: 600px;
  height: 420px;
  top: 100px;
  background-color: white;
  border-radius: 10px;
  z-index: 11;
  }
  .task-header {
    margin-top: 30px;
    text-transform: uppercase;
  }
  .task-header, .task-time, .task-text {
    margin-left: 30px;
  }
  .task-time {
    margin-top: 20px;
  }
  .task-text {
    margin-top: 15px;
    div {
      margin: 10px 30px 0 0px;
      border: 1px solid #eee;
      height: 180px;
      padding: 10px;
    }
  }
  .task-text, .task-time {
    *:first-child {
      font-weight: bold;
    }
  }
  .btn-wrapper {
    .edit-btn {
      display: block;
      margin: 20px auto;
      outline: none;
      border-radius: 4px;
      border: none;
      width: 100px;
      height: 40px;
      cursor: pointer;
      font-size: 14px;
      background-color: #eee;
      transition: background-color 0.4s;
      &:hover {
        background-color: lightgray;
      }
    }
  }
</style>
