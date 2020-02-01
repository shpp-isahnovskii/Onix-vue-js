<template lang="pug">
  div(class="card_wrapper" :class="cardColor" v-on:click="getId()" 
    @dragover.prevent 
    draggable="true" 
    @dragstart="dragStart" 
    @dragenter="dragEnter" 
    @dragleave="dragLeave"
    @drop.prevent="dragLeave" 
  )
    div(class="card_time")
      span {{date}} | {{time}}
      span(v-if="expiration < 2" class="card_expiration" :class="dotColor")
    div(class="card_title") {{title}}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";

@Component
  export default class Card extends Vue {
    @Prop({default: 0}) id!: number;
    @Prop({default: ""}) title!: string;
    @Prop({default: ""}) date!: string;
    @Prop({default: ""}) time!: string;
    @Prop({default: "todo"}) tableId!: string;
    @Prop({default: 2}) expiration!: number

    constructor() {
      super();
    }
    /* return card color */
    get cardColor(): string {
      return `card_hover__${this.tableId}`;
    }
    get dotColor() {

      return `card_color__${ this.expiration > 0 ? 'yellow' : 'red'}`
    }
    /* animation: change background color */
    dragEnter(event: any) {
      const element = event.target.parentElement;
      if(element.className == "card_wrapper") {
        element.classList.add("card__hover")
      }
    }
    /* animation: change background color */
    dragLeave(event: any) {
      const element = event.target.parentElement;
      if( element.classList.contains("card__hover") ) {
        element.classList.remove("card__hover")
      }
    }
    /* set id of the dragging card this.id can be: todo inprogress done */
    dragStart(event: any) {
      event.dataTransfer.setData('card_id', this.id);
    }
    getId() {
      this.$emit('task-clicked', this.id);
    }
    //drop() function placed in the Table component, it's gives a possibility to drop a card on the title of the table
  }
</script>

<style lang="scss">
  .card_wrapper {
    display: block;
    background-color: white;
    margin: 5px;
    border-radius: 4px;
    padding: 4px;
    white-space: pre-wrap;
    &:hover {
      cursor: pointer;
    }
    .card_time {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid silver;
      padding-bottom: 4px;
      font-size: 14px;
    }
    .card_title {
      overflow: auto;
      padding: 10px 5px;
    }
  }
  .card_hover__todo {
    background-color: rgb(246, 248, 255);
  }
  .card_hover__inprogress {
    background-color: rgb(255, 252, 232);
  }
  .card_hover__done {
    background-color: rgb(250, 255, 244);
  }
  .card_expiration {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    &.card_color__red {
      background-color: tomato;
    }
    &.card_color__yellow {
      background-color: $yellow;
    }
  }
</style>