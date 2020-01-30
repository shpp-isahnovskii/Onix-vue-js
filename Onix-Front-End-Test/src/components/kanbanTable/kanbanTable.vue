<template lang="pug">
  div(class="table_column"
    @dragover.prevent 
    @dragenter="enter"
    @dragleave="leave"
    @drop.prevent="drop"
  ) 
    div(class="table_column__title") {{title}}
    div(class="table_column__body")
      kanbanCard(v-for="(card, n) in data" :key="n"
      v-bind:id="card.id"
      v-bind:title="card.title"
      v-bind:date="getDate(card.date)"
      v-bind:time="getTime(card.date)"
      v-on:task-clicked="taskClicked"
    )
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { TasksInterface } from '@/interfaces/TasksInterface';
  import kanbanCard from "./kanbanCard.vue";
  import { mixins } from "vue-class-component";
  import DateMixin from "@/mixins/DateMixin"

@Component({components: { kanbanCard }})
export default class Table extends mixins(DateMixin) {
  @Prop({default:"..."}) title!: string;
  @Prop({default: 0}) tableId!: string; //value can be: todo inprogress or done
  @Prop({default: []}) data!: TasksInterface[];

  constructor() {
    super();
  }
  enter(event: any) {
    const classList = event.target.classList
    if(classList.contains("table_column__title")) {
      classList.add("column_title__hover");
    }
  }
  leave(event: any) {
    const classList = event.target.classList
    if(classList.contains("column_title__hover")) {
      classList.remove("column_title__hover");
    }
  }
  drop(event: any) {
    event.target.classList.remove("column_title__hover");

    const id = event.dataTransfer.getData('card_id');
    this.$emit('card-drop', this.tableId, id);
  }
  /* emit trigger bubble up */
  taskClicked(id: number) {
    this.$emit('task-clicked', id);
  }
}
</script>

<style lang="scss">
  .table_column {
    width: 250px;
    margin: 0 2px;
    background-color: rgb(236, 234, 234);
    border-radius: 4px;
    min-height: 74px;
    .table_column__title {
      background-color: ghostwhite;
      text-align: center;
      padding: 5px;
      &.column_title__hover {
        background-color: #eceaea;
      }
    }
  }
</style>