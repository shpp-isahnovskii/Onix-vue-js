<template lang="pug">
  div(v-if="addTask || editTask")
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
    @Prop({default: false}) addTask !: boolean;
    @Prop({default: false}) editTask !: boolean;
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
        const convertedTime : string = this.timeConvertAMPM(time);
        title = title.toLowerCase();

        /* find task  */
        const titleIndex : number = this.tasks.findIndex( e => e.title === title);
        if(titleIndex !== -1) {

          /* find time in subtasks */
          const timeIndex : number = this.tasks[titleIndex].subtasks.findIndex( e => e.time === convertedTime);
          if(timeIndex !== -1) {
            Vue.set(this.tasks[titleIndex].subtasks, timeIndex , {description: text, time: convertedTime, status: 'todo'}); //refresh task with the same time
          } else {
            Vue.set(this.tasks[titleIndex].subtasks, this.tasks[titleIndex].subtasks.length, 
              {description: text, time: convertedTime, status: 'todo'}); //add new time to current existing task
              this.increaseTasksCounter();
          }
        } else {
          Vue.set(this.tasks, this.tasks.length, {title: title , 
            subtasks: [{description: text, time: convertedTime, status: 'todo'}]}); //add absolutely new task
            this.increaseTasksCounter();
        }
        this.resetFormFields();
        this.toggleModal(); //success
      }
    }
    /* sidebar menu counter +1 */
    increaseTasksCounter() : void {
      userData.tasks.open++;
    }
      /* Reset all input values for the task form */
    resetFormFields() {
      this.taskDate = '';
      this.taskTime = '';
      this.taskText = '';
    }
      /* convert time from 24 to 12AM/PM */
    timeConvertAMPM(time: any) {
    //24 to 12 - get example from here: https://medium.com/front-end-weekly/how-to-convert-24-hours-format-to-12-hours-in-javascript-ca19dfd7419d
      time = time.split(':');
      time[1] += time[0] >= 12 ? 'PM' : 'AM';
      time[0] = time[0] % 12 || 12;
      return time.join('.');
    }
    toggleModal() {
      this.resetFormFields();
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