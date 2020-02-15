<template lang="pug">
  .modal-window
    .modal-overlay(v-on:click="hideModal()")
    .form-wrapper
      h3 {{taskTitle}}
      form(class='modal-task-form' @submit.prevent="" @input.once="editTrigger()")
        .header__wrapper Date: 
          input(type="date" v-model="taskDate" class="task__date" :disabled="edit == false")
        .time__wrapper Time: 
          input(type='time' v-model="taskTime" class="task__time" :disabled="edit == false")
          img(v-if="editing" v-bind:src="[edit ? lockImg[1].src : lockImg[0].src]" v-bind:alt="[edit ? lockImg[1].alt : lockImg[0].alt]" class="form-lock-img" v-on:click="toggleLock()")
        textarea(rows="12" v-model="taskText" placeholder="Text here.." class="task__text" ref='textInput' :disabled="edit == false")
        .task_btn__wrapper
          button(v-if="editing" type='button' class="task__btn" :class="chooseClass()" v-on:click="chooseAction()")
            | {{buttonText}}
          button(v-else type='button' class="task__btn" :class="chooseClass()" v-on:click="hideModal()") Close
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TasksInterface } from "@/interfaces/TasksInterface";
import { ImgInterface } from '@/interfaces/ImgInterface';
import DateMixin from '@/mixins/DateMixin'
import { mixins } from 'vue-class-component'

import { namespace } from 'vuex-class'
const TaskStore = namespace('tasks');

@Component
export default class TaskModal extends mixins(DateMixin) {
  @TaskStore.State('tasksData') tasks !: TasksInterface[];
  @TaskStore.Action("fetchChangeTask") fetchChangeTask !: Function;
  @TaskStore.Mutation('changeTaskData') changeTaskData !: Function;

  @Prop({default: true}) editing !: boolean;
  @Prop({default: false}) showModal !: boolean;
  @Prop({default: 0}) id !: number;
  taskTitle: string;
  taskDate: string;
  taskTime: string;
  taskText: string;
  edit: boolean;
  changed: boolean;
  buttonText: string;
  lockImg: ImgInterface[]; 
  $refs!: {
    textInput: HTMLFormElement;
  }
  constructor() {
    super();
    this.taskTitle = "";
    this.taskDate = "";
    this.taskTime = "";
    this.taskText = "";
    this.edit = false;
    this.changed = false;
    this.lockImg = [{
        src: require("@/assets/images/site/lock/lock.svg"), 
        alt: "lock"
      },
      {
        src: require("@/assets/images/site/lock/unlock.svg"),
        alt: "unlock"
    }];
    this.buttonText = "Edit";
  }
  /* add watcher to set default time value */
  @Watch('tasks', {immediate: true}) onChange() {
    const index = this.tasks.map( (el: TasksInterface) => el.id).indexOf(this.id);
    this.taskTitle = this.tasks[index].title;
    this.taskDate = this.getDate(this.tasks[index].date);
    this.taskTime = this.getTime(this.tasks[index].date);
    this.taskText = this.tasks[index].description;
  }
  /* edit trigger, used at the lock img */
  toggleLock(): void {
    this.edit = !this.edit;
  }
  /* if Form areas was changed - set this trigger to true */
  editTrigger() {
    this.changed = true;
  }
  chooseClass(): string {
    if(this.edit) {
      if(this.changed) {
        this.buttonText = "Save"
        return "btn__submit";
      }
      this.buttonText = "Cancel"
      return "btn__cancel";
    }
    this.buttonText = "Edit"
    return "btn__edit";
  }
  /* Chose an action. Logic based on 'edit' and 'changed' booleans
   * Base logic:
   * 1. allow to edit Form fields
   * 2. submit Form and close modal window
   * 3. just close modal window
   */
  async chooseAction() {
    if(!this.edit) { //first click 
      this.edit = true; //allow editing
      if(!this.changed) {
        this.buttonText = "Cancel";
      }
      return
    }
    if(this.edit && this.changed) { //if something was edited
      let task : TasksInterface = this.tasks[this.id];
      task.title = this.taskTitle;
      task.description = this.taskText
      task.date = `${this.taskDate}T${this.taskTime}`;

      await this.fetchChangeTask(task).then((response: boolean) => {
        if(response) {
          this.changeTaskData(task); 
          this.hideModal(); //hide modal if no changes after allow
        }
      });
    }
  }
  /* hide modal action, emited to TaskModal */
  hideModal() {
    this.$emit('hideModal');
  }
  /* if edit mode on - set focus to the text form */
  focusOnText() {
    this.$nextTick(() => {this.$refs.textInput.focus()});
  }
}
</script>


<style lang="scss">
  input[type="date"]:disabled, input[type="time"]:disabled {
    color:rgb(200, 200, 200);
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
      &.btn__submit {
        color: white;
        background-color: rgb(140, 223, 142);
        &:hover {
          background-color: rgb(98, 218, 100);
        }
      }
      &.btn__cancel {
        color: white;
        background-color: rgb(223, 140, 140);
        &:hover {
          background-color: rgb(214, 106, 106);
        }
      }
    }
  }
  .modal-task-form {
    .form-lock-img {
      position: relative;
      top: 5px;
    }
  }
</style>
