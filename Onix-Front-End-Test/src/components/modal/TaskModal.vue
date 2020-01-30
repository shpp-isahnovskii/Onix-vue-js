<template lang="pug">
  div
    taskCreate(v-if="addTask" v-on:hideModal="hideModal()")
    taskEdit(v-if="editTask" v-bind:clickedTask="clickedTask" v-on:hideModal="hideModal()")
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import taskCreate from "./TaskCreateModal.vue";
  import taskEdit from "./TaskDetailsModal.vue";

@Component({components: { taskCreate, taskEdit }})
  export default class TaskModal extends Vue {
    @Prop({default: false}) addTask !: boolean;
    @Prop({default: false}) editTask !: boolean;
    @Prop({default: undefined}) clickedTask !: number;

    constructor() {
      super();
    }
    hideModal(){
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
    height: 465px;
    top: 100px;
    background-color: white;
    border-radius: 10px;
    z-index: 11;
  }
  .modal-task-form {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 4px 26px 0 26px;
    
    .task__date, .task__text, .task__time, .task__title {
      font-size: 16px;
      outline: none;
      border: none;
    }
    .task__date, .task__time {
      padding-bottom: 2px;
      margin-bottom: 5px;
    }
    .task__date {
      max-width: 320px;
    }
    .task__title {
      padding-left: 4px;
      border-bottom: 1px solid silver;
      width: 180px;
    }
    .task__text {
      margin-top: 5px;
      resize: none;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .task__date, .task__text {
      padding-left: 4px;
    }
    .time__wrapper {
      position: relative; 
      color: #131313;
      margin-bottom: 10px;
    }
  }
  .task_btn__wrapper {
    margin-top: 20px;
    .task__btn {
      display: inline-block;
      border: none;
      outline: none;
      text-decoration: none;
      font-size: 18px;
      padding: 10px 12px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 14px;
      transition: background-color 0.5s;
      &:hover {
      cursor: pointer;
      }
    }
  }
</style>