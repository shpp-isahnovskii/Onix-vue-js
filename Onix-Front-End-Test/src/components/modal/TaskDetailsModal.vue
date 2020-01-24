<template lang="pug">
  .modal-window
    .modal-overlay(v-on:click="toggleModal()")
    .form-wrapper
      form(class='modal-task-form' @submit.prevent="")
        .header__wrapper Date: 
          input(type="date" :value="tasks[clickedTask[0]].title" class="task__date" disabled)
        .time__wrapper Time: 
          input(type='time' v-model="taskTime" v-bind:class="{time__underline : edit}" class="task__time" :disabled="edit == false")
          img(v-bind:src="[edit ? lockImg[1].src : lockImg[0].src]" v-bind:alt="[edit ? lockImg[1].alt : lockImg[0].alt]" class="form-lock-img")
        textarea(rows="12" v-model="taskText" placeholder="Text here.." class="task__text" ref='textInput' :disabled="edit == false")
        .task_btn__wrapper
          button(type='button' class='task__btn btn__edit' v-on:click="allowEditing()") Edit
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TasksInterface } from "@/interfaces/TasksInterface";
import { dataTask } from '@/store/database';
import { ImgInterface } from '@/interfaces/ImgInterface'

@Component
export default class TaskModal extends Vue {
  @Prop({default: false}) showModal !: boolean;
  @Prop({default: undefined}) clickedTask !: number[]; //give an array in format [0, 1, 2]. 0 - date, 1 - time, 2 - description
  taskTime: string;
  taskText: string;
  edit: boolean;
  lockImg: ImgInterface[];
  $refs!: {
    textInput: HTMLFormElement;
  }
  constructor() {
    super();
    this.taskTime = "";
    this.taskText = "";
    this.edit = false;
    this.lockImg = [{
        src: require("@/assets/images/site/lock/lock.svg"), 
        alt: "lock"
      },
      {
        src: require("@/assets/images/site/lock/unlock.svg"),
        alt: "unlock"
    }];
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
  allowEditing() {
    this.edit = true;
    this.focusOnText();
  }
  focusOnText() {
    this.$nextTick(() => {this.$refs.textInput.focus()});
  }
}
</script>


<style lang="scss" scoped>
  input[type="date"]:disabled, input[type="date"]:disabled {
    background: none;
  }
  .task_btn__wrapper {
    align-self: center;
    .task__btn {
      color: rgb(30, 30, 30);
      width: 80px;
      &.btn__edit {
        background-color: rgb(220, 220, 220);
        &:hover {
          background-color: rgb(200, 200, 200);
        }
      }
      &.btn__save {
        background-color: rgb(140, 223, 142);
        &:hover {
          background-color: rgb(98, 218, 100);
        }
      }
    }
  }
  .modal-task-form {
    .form-lock-img {
      position: relative;
      top: 4px;
    }
  }
</style>
