<template lang="pug">
  div(class="card_wrapper" 
    @dragover.prevent 
    draggable="true" 
    @dragstart="dragStart" 
    @dragenter="dragEnter" 
    @dragleave="dragLeave"
    @drop.prevent="dragLeave" 
  )
    div(class="card_time") {{date}} |   {{time}}
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

    constructor() {
      super();
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
    /* set id of the dragging card */
    dragStart(event: any) {
      event.dataTransfer.setData('card_id', this.id);
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
      border-bottom: 1px solid silver;
      padding-bottom: 4px;
      font-size: 14px;
    }
    .card_title {
      overflow: auto;
      padding: 10px 5px;
    }
  }
  .card__hover {
    background-color: rgb(250, 250, 250);
  }
</style>