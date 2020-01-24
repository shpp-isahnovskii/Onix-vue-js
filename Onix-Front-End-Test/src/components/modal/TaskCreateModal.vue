<template lang="pug">
  .modal-window
    .modal-overlay(v-on:click="toggleModal()")
    .form-wrapper
      form(class='modal-task-form' @submit.prevent="adding(taskDate, taskText, taskTime)")
        .header__wrapper Date: 
          input(type="date" v-model="taskDate" class="task__date")
        .time__wrapper Time: 
          input(type='time' v-model="taskTime" placeholder="set time.." class="task__time")
        textarea(rows="12" v-model="taskText" placeholder="Task text here.." class="task__text")
        .task_btn__wrapper
          button(type='submit' class='task__btn btn__submit') Submit
          button(type='button' class='task__btn btn__cancel' v-on:click="toggleModal()") Cancel
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { TasksInterface } from "@/interfaces/TasksInterface";
import { dataTask, userData } from '@/store/database';

@Component
  export default class TaskCreateModal extends Vue {
    taskDate: string;
    taskTime: string;
    taskText: string;
    constructor() {
      super();
      this.taskDate = "";
      this.taskTime = "";
      this.taskText = "";
    }
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
    /* adding new subtask, change subtask with same time, or create new task with new title  */
    adding(title:string, text: string, time: string) {
      if( !title || !text || !time ) {
        window.alert("please, input something in the task message and set the time");
      } else {
        title = title.toLowerCase();

        /* find task  */
        const titleIndex : number = this.tasks.findIndex( e => e.title === title);
        if(titleIndex !== -1) {

          /* find time in subtasks */
          const timeIndex : number = this.tasks[titleIndex].subtasks.findIndex( e => e.time === time);
          if(timeIndex !== -1) {
            Vue.set(this.tasks[titleIndex].subtasks, timeIndex , {description: text, time: time, status: 'todo'}); //refresh task with the same time
          } else {
            Vue.set(this.tasks[titleIndex].subtasks, this.tasks[titleIndex].subtasks.length, 
              {description: text, time: time, status: 'todo'}); //add new time to current existing task
              this.increaseTasksCounter();
          }
        } else {
          Vue.set(this.tasks, this.tasks.length, {title: title , 
            subtasks: [{description: text, time: time, status: 'todo'}]}); //add absolutely new task
            this.increaseTasksCounter();
        }
        this.toggleModal(); //success
      }
    }
    /* sidebar menu counter +1 */
    increaseTasksCounter() : void {
      userData.tasks.open++;
    }
    toggleModal() {
      this.$emit('hideModal');
    }
  }
</script>

<style lang="scss" scoped>
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