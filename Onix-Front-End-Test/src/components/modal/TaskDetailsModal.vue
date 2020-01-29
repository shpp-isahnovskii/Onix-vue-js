<template lang="pug">
  .modal-window
    .modal-overlay(v-on:click="hideModal()")
    .form-wrapper
      form(class='modal-task-form' @submit.prevent="" @input.once="changedTrigger()")
        .header__wrapper Date: 
          input(type="date" v-model="taskDate" class="task__date" disabled)
        .time__wrapper Time: 
          input(type='time' v-model="taskTime" class="task__time" :disabled="edit == false")
          img( v-bind:src="[edit ? lockImg[1].src : lockImg[0].src]" v-bind:alt="[edit ? lockImg[1].alt : lockImg[0].alt]" class="form-lock-img" v-on:click="toggleEdit()")
        textarea(rows="12" v-model="taskText" placeholder="Text here.." class="task__text" ref='textInput' :disabled="edit == false")
        .task_btn__wrapper
          button(type='button' class="task__btn" :class="[changed ? 'btn__submit': (edit ? 'btn__cancel' : 'btn__edit') ]" v-on:click="chooseAction()")
            | {{buttonText}}
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TasksInterface } from "@/interfaces/TasksInterface";
import { dataTasks } from '@/store/database';
import { ImgInterface } from '@/interfaces/ImgInterface';

@Component
export default class TaskModal extends Vue {
  @Prop({default: false}) showModal !: boolean;
  @Prop({default: undefined}) clickedTask !: number[]; //give an array in format [0, 1, 2]. 0 - date, 1 - time, 2 - description
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
  /*get tasks from the store*/
  get tasks(): TasksInterface[] {
    return this.$store.getters.getTasks;
  }
  /* add watcher to set default time value */
  @Watch('tasks', {immediate: true}) onChange() {
    this.taskDate = this.tasks[this.clickedTask[0]].title;
    this.taskTime = this.tasks[this.clickedTask[0]].date;
    this.taskText = this.tasks[this.clickedTask[0]].description;
  }
  // /* add data-base from the store */
  created() {
    this.$store.dispatch('loadTasks', dataTasks);
  }
  /* edit trigger, used at the lock img */
  toggleEdit() {
    this.edit = !this.edit;
  }
  /* if Form areas was changed - set this trigger to true */
  changedTrigger() {
    this.changed = true;
    this.buttonText = "Save";
  }
  /* Chose an action. Logic based on 'edit' and 'changed' booleans
   * Base logic:
   * 1. allow to edit Form fields
   * 2. submit Form and close modal window
   * 3. just close modal window
   */
  chooseAction(): void {
    if(!this.edit) { //first click 
      this.edit = true; //allow editing
      if(!this.changed) {
        this.buttonText = "Cancel";
      }
      return
    }
    if(this.edit && this.changed) { //if something was edited
      this.confirmChanges(this.taskTime, this.taskText);
    }
    this.hideModal(); //hide modal if no changes after allow
  }
  /* hide modal action, emited to TaskModal */
  hideModal() {
    this.$emit('hideModal');
  }
  /* if edit mode on - set focus to the text form */
  focusOnText() {
    this.$nextTick(() => {this.$refs.textInput.focus()});
  }
  /* add new data to the data-base */
  confirmChanges(time: string, text: string) {
    Vue.set(this.tasks[this.clickedTask[0]], 'description', text);
    Vue.set(this.tasks[this.clickedTask[0]], 'date', time);
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
