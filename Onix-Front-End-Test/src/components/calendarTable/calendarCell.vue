<template lang="pug">
  td
    div(v-if="day <= 0 || day > lastDay" class="day_invisible")
    div(v-else class="calendar-cell")
      div(class="day_val" :class="{ day_today : day === 100 }") {{day}}
      div(v-for="(task, i) in dailyTasks" v-bind:key="i" class="day_task")
        span(v-on:click="taskClicked(task.id)") {{task.title}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { TasksInterface } from "@/interfaces/TasksInterface";

@Component
  export default class CalendarCell extends Vue {
    @Prop({default: undefined}) day !:number;
    @Prop({default: undefined}) firstDay !:number;
    @Prop({default: undefined}) lastDay !:number;
    @Prop({default: undefined}) dailyTasks !:TasksInterface[];

    taskClicked(id: number) {
      this.$emit("task-click", id);
    }
  }
</script>

<style lang="scss">
  .calendar-cell {
    width: 80px;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .day_invisible {
    visibility: hidden;
  }
  .day_val {
    border-left: 2px solid rgba(192, 192, 192, 0.5);
    border-bottom: 2px solid rgba(192, 192, 192, 0.5);
    width: 18px;
    height: 16px;
    border-radius: 0 0 0 50%;
    align-self: flex-end;
    text-align: right;
    margin-bottom: 4px;
    font-size: 12px;
  }

  .day_today {
    background-color: rgba(255, 197, 71, 0.126);
  }
  .day_task {
    text-align: left;
    margin: 2px 4px;
    background-color:#f0efee;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 14px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 5px;
    }
  }
</style>