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
    @Prop({default: undefined}) clickedTask !: number[]; // kanban task-id. Example: [0, 1, 2], where 0 - date, 1 - time, 2 - description

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
    height: 425px;
    top: 100px;
    background-color: white;
    border-radius: 10px;
    z-index: 11;
  }
  .modal-task-form {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 16px 26px 0 26px;
    
    .task__date, .task__text, .task__time {
      font-size: 16px;
      outline: none;
      border: none;
    }
    .task__date, .task__time {
      padding-bottom: 2px;
      margin-bottom: 5px;
    }
    .task__time {
      border-bottom: 1px solid lightgray;
    }
    .header__wrapper {
      margin-top: 20px;
    }
    .task__date {
      max-width: 320px;
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
    align-self: flex-end;
    margin-top: 20px;
    .task__btn {
      display: inline-block;
      border: none;
      color: white;
      text-decoration: none;
      font-size: 18px;
      padding: 10px 12px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 14px;
      transition: background-color 0.5s;
      &.btn__submit {
        background-color: rgb(140, 223, 142);
        &:hover {
          background-color: rgb(98, 218, 100);
        }
      }
      &.btn__cancel {
        background-color: rgb(223, 140, 140);
        &:hover {
          background-color: rgb(214, 106, 106);
        }
      }
      &:hover {
      cursor: pointer;
      }
    }
  }
</style>