<template lang="pug">
  div(class="table_column"
    @dragover.prevent 
    @dragenter="enter"
    @dragleave="leave"
    @drop.prevent="drop"
  ) 
    div(class="table_column__title")
      span {{title}}
        span(v-if="expirationOne > 0" class="table__cards_amount table_card__yellow") {{expirationOne}}
        span(v-if="outOfDate > 0" class="table__cards_amount table_card__red") {{outOfDate}}
    div(class="table_column__body")
      kanbanCard(v-for="(card, n) in data" :key="n"
      v-bind:id="card.id"
      v-bind:title="card.title"
      v-bind:date="getDate(card.date)"
      v-bind:time="getTime(card.date)"
      v-bind:tableId="tableId"
      v-bind:expiration="card.expiration"
      v-on:task-clicked="taskClicked"
    )
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from "vue-property-decorator";
  import TasksModInterface from '@/interfaces/TasksModInterface';
  import kanbanCard from "./kanbanCard.vue";
  import { mixins } from "vue-class-component";
  import DateMixin from "@/mixins/DateMixin"

@Component({components: { kanbanCard }})
export default class Table extends mixins(DateMixin) {
  @Prop({default:"..."}) title!: string;
  @Prop({default: "todo"}) tableId!: string; //value can be: todo inprogress or done
  @Prop({default: []}) data!: TasksModInterface[];

  expirationOne: number;
  outOfDate: number;

  constructor() {
    super();
    this.expirationOne = 0;
    this.outOfDate = 0;
  }
  @Watch('data', {immediate: true} )
  onDatechange(val: TasksModInterface[], newVal: TasksModInterface[]) {
    this.expirationOne = this.expirationFilter(1);
    this.outOfDate = this.expirationFilter(0);
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

  /* @param expiration: days untill expiration date. 
   * Can be: 
   * 2 - or more days to the expiration day
   * 1 - day to,
   * 0 - out of date 
  **/
  expirationFilter(expiration: number) {
    return this.data.filter( (e: TasksModInterface) => e.expiration == expiration).length;
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
      .table__cards_amount {
        display: inline-block;
        background-color: #f0f0f0;
        padding: 0 5px;
        border-radius: 10px;
        margin-left: 5px;
        font-size: 12px;
      }
      .table_card__yellow {
        background-color: $yellow;
      }
      .table_card__red {
        background-color: tomato;
      }
    }
  }
</style>