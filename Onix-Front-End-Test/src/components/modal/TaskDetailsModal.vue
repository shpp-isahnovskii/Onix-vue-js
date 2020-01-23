<template lang="pug">
  .modal-window
    .modal-overlay(v-on:click="toggleModal()")
    .form-wrapper
      form(class='modal-task-form' @submit.prevent="")
        .header__wrapper Date: 
          input(type="date" :value="tasks[clickedTask[0]].title" class="task__date" disabled)
        .time__wrapper Time: 
          input(type='time' v-model="taskTime" class="task__time" disabled)
        textarea(rows="12" v-model="taskText" placeholder="Text here.." class="task__text" disabled)
        .task_btn__wrapper
          button(type='submit' class='task__btn btn__submit') Submit
          button(type='button' class='task__btn btn__cancel' v-on:click="toggleModal()") Cancel
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TasksInterface } from "@/interfaces/TasksInterface";
import { dataTask } from '@/store/database';

@Component
export default class TaskModal extends Vue {
  @Prop({default: false}) showModal !: boolean;
  @Prop({default: undefined}) clickedTask !: number[]; //give an array in format [0, 1, 2]. 0 - date, 1 - time, 2 - description
  taskTime: string;
  taskText: string;
  constructor() {
    super();
    this.taskTime = "";
    this.taskText = "";
  }
  /*get tasks from the store*/
  get tasks(): TasksInterface[] {
    return this.$store.getters.getTasks;
  }
  /* add watcher to set default time value */
  @Watch('tasks', {immediate: true}) onChange() {
    this.taskTime = this.tasks[this.clickedTask[0]].subtasks[this.clickedTask[1]].time;
    this.taskText = this.tasks[this.clickedTask[0]].subtasks[this.clickedTask[1]].description;
  }
  created() {
    this.$store.dispatch('loadTasks', dataTask);
  }
  toggleModal() {
    this.$emit('hideModal');
  }
}
</script>


<style lang="scss" scoped>
  input[type="date"]:disabled, input[type="date"]:disabled {
    background: none;
  }
</style>
