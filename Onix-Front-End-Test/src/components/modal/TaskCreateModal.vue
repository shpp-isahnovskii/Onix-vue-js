<template lang="pug">
  .modal-window
    .modal-overlay(v-on:click="toggleModal()")
    .form-wrapper
      h3 New Task
      form(class='modal-task-form' @submit.prevent="adding(taskId, taskDate, taskTime, taskTitle, taskText)")
        .header__wrapper Date: 
          input(type="date" v-model="taskDate" class="task__date" required)
        .time__wrapper Time: 
          input(type='time' v-model="taskTime" class="task__time" required)
        input(type='text' v-model="taskTitle" placeholder="Set title.." class="task__title" required)
        textarea(rows="12" v-model="taskText" placeholder="Task text here.." class="task__text" required)
        .task_btn__wrapper
          button(type='submit' class='task__btn btn__submit') Submit
          button(type='button' class='task__btn btn__cancel' v-on:click="toggleModal()") Cancel
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { TasksInterface } from "@/interfaces/TasksInterface";

import { namespace } from 'vuex-class';
const TaskStore = namespace('tasks');
const UserStore = namespace('user');

@Component
  export default class TaskCreateModal extends Vue {
    @TaskStore.State('tasksData') tasks !: TasksInterface[];
    @TaskStore.Action('fetchAddingTask') fetchAddingTask !: Function;
    @TaskStore.Mutation('addingTask') addingTask !: Function;
    @UserStore.Mutation('addTaskCounter') addTaskCounter !: Function;

    @Prop({default: 0}) taskId !: number;
    taskDate: string;
    taskTime: string;
    taskTitle: string;
    taskText: string;
    constructor() {
      super();
      this.taskDate = "";
      this.taskTime = "";
      this.taskText = "";
      this.taskTitle = "";
    }

    async adding(id: number, date:string, time: string, title: string, text: string) {
      if( !date || !time || !title || !text ) {
        window.alert("please, input something in the task message and set the time");
      } else {
        const task = {id: id, title: title, description: text + id, date: `${date}T${time}`, status: 'todo'};
        const fetch  = await this.fetchAddingTask(task);
        if(fetch) {
          this.addingTask(task)
          this.addTaskCounter();
          this.toggleModal();
        }
      }
    }
    created() {
      this.taskDate = this.setDate();
    }
    /* set current day to data input */
    setDate(): string {
      return (new Date).toISOString().substr(0, 10);
    }
    toggleModal() {
      this.$emit('hideModal');
    }
  }
</script>

<style lang="scss">
  h3 {
    text-align: center;
    margin: 0;
    margin-top: 20px;
    font-size: 20px;
  }
  .task_btn__wrapper {
    align-self: flex-end;
    .task__btn {
      color: white;
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
    }
  }
</style>