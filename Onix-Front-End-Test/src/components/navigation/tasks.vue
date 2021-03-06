<template lang="pug">
  section
    div
      button(class="section-button" v-on:click="toggleModal()") Add new task
      transition-group(tag='div' name='tasks-list' v-on:enter="addBlinkAnimation")
        div(v-for='(task, i) in tasks', v-bind:key='task.id' ref="tasksRef")
          .article
            div(class="date_wrapper")
              h3 {{task.title}} 
              span(class="task_date") {{dateFormating(getDate(task.date))}}
            p {{task.description}}
              .article__time
                span(class="article_time__text") {{getTime(task.date)}}
                span(class="article__remove")
                  div(v-on:click="remove(i)") x
                button(class='article-button__status' v-on:click="changeTaskStatus(i)") {{task.status}}
      taskModal( v-bind:addTask="modal" v-bind:id="dataLength()" v-on:hideModal="toggleModal()")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TasksInterface } from "@/interfaces/TasksInterface";
import taskModal from "../modal/TaskModal.vue";

import { mixins } from "vue-class-component";
import DateMixin from "@/mixins/DateMixin";

import { namespace } from "vuex-class";
const TaskStore = namespace("tasks");
const userStore = namespace("user");

@Component({ components: { taskModal } })
export default class Tasks extends mixins(DateMixin) {
  @userStore.Mutation("removeTaskCounter") removeTaskCounter !: Function;
  @TaskStore.State("tasksData") tasks!: TasksInterface[];

  //delete the task
  @TaskStore.Action("fetchDeleteTask") fetchDeleteTask !: Function;
  @TaskStore.Mutation("delTask") delTask!: Function;

  //change status of the task
  @TaskStore.Action("fetchChangeTask") fetchChangeTask !: Function;
  @TaskStore.Mutation("changeTaskData") changeTaskData !: Function;

  modal: boolean;
  $refs!: {
    tasksRef: HTMLFormElement;
  };
  constructor() {
    super();
    this.modal = false;
  }

  dataLength() {
    return this.tasks.length;
  }
  mounted() {
    if (this.tasks) {
      this.makeWave();
    }
  }

  /*init wave for once*/
  makeWave() {
    this.$root.$on("make-wave", () => {
      if (this.tasks.length !== 0) {
        this.waveAnimation(this.$refs.tasksRef);
      }
    });
  }
  /* add wave animation to tasks array */
  waveAnimation(refs: HTMLFormElement) {
    //$refs example: https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs
    refs.forEach((element: HTMLFormElement, index: number) => {
      setTimeout(
        () => element.classList.add("tasks-wave__animation"),
        80 * index + 800
      );
    });
  }
  /* remove Task */
  async remove(index: number) {
    
    const id = this.tasks[index].id;
    await this.fetchDeleteTask(id).then((response: boolean) => {
      if(response) {
        this.delTask(index); //tasks mutation
        this.removeTaskCounter();//user mutation
      }
    });
  }
  /* change status for the task */
  async changeTaskStatus(index: number, status: string) {
    const task : TasksInterface = this.tasks[index];
    task.status = this.nextStatus(task.status);
    await this.fetchChangeTask(task).then((response: boolean) => {
      if(response) {
        this.changeTaskData(task); 
      }
    });
  }
  /* next status for the current task */
  nextStatus(status: string): string {
    const statuses = ['todo', 'inprogress', 'done'];
    let nextStatus = "";

    switch (status) {
      case statuses[0]: nextStatus = statuses[1];
      break;
      case statuses[1]: nextStatus = statuses[2];
      break;
      default: nextStatus = statuses[0];
      break;
    }
    return nextStatus;
  }

  /* add blink animation */
  addBlinkAnimation() {
    setTimeout(
      () =>
        this.$refs.tasksRef[this.$refs.tasksRef.length - 1].classList.add(
          "task-blink__animation"
        ),
      1000
    );
  }
  toggleModal() {
    this.modal = !this.modal;
    if (this.modal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks-list-enter-active,
.tasks-list-leave-active {
  transition: opacity 1s, transform 1s;
}
.tasks-list-enter,
.tasks-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
//blink
.task-blink__animation {
  animation-name: thisTaskBlink;
  animation-duration: 1.7s;
}
@keyframes thisTaskBlink {
  from {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
//text scale
.tasks-wave__animation {
  animation-name: thisTasksAnimation;
  animation-duration: 0.4s;
}
@keyframes thisTasksAnimation {
  from {
    font-size: 1em;
  }
  50% {
    font-size: 1.04em;
  }
  to {
    font-size: 1em;
  }
}
.date_wrapper {
  display: flex;
  flex-basis: 100%;
}

h3 {
  display: inline-block;
  margin: 0px;
  font-size: 16px;
}
.task_date {
  display: inline-block;
  font-size: 12px;
  font-weight: 100;
  margin-left: 10px;
}
.article {
  margin: 0 26px 0 34px;
  p {
    padding-top: 4px;
  }
}
.article:last-child {
  margin-bottom: 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.2s;
}
p {
  max-width: 480px;
  overflow-wrap: break-word;
  background-color: #f7f7f7;
  border-radius: 4px;
  border-left: 10px solid #f7f7f7;
}
.article__time {
  .article_time__text {
    margin-left: 12px;
  }
  .article__remove {
    display: inline-block;
    position: relative;
    text-align: center;
    margin-left: 10px;
    width: 20px;
    border-radius: 50%;
    background-color: tomato;
    color: white;
    font-weight: bold;
    div {
      position: relative;
      top: -1px;
    }
  }
  .article__remove:hover {
    cursor: pointer;
  }
}
.section-button {
  margin: 32px;
  height: 40px;
  padding: 0 15px;
  color: white;
  background-color: #66bb66;
  border: 1px solid #4cae4c;
}
.article-button__status {
  margin-top: 6px;
  display: block;
  width: 80px;
  position: relative;
  left: -2px;
}
.article-button__status,
.section-button {
  border-radius: 4px;
  outline: none;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    border-radius: 4px;
  }
}
.article-button__status:hover {
  background-color: #dbdbdb;
}
.section-button:hover {
  background-color: #449d44;
  border-color: #398439;
}
</style>  





