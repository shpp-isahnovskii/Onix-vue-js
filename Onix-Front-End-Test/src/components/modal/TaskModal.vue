<template lang="pug">
    .modal-window( v-if="editTask" )
      .modal-overlay(v-on:click="toggleModal()")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TaskModal extends Vue {
  editTask: boolean;

  constructor() {
    super();
    this.editTask = false;
  }
  toggleModal() {
    this.editTask = !this.editTask;
  }
}
</script>


<style lang="scss">
  .modal-window{
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      background-color: gray;
      z-index: 10;
      cursor: pointer;
    }
    .form-wrapper {
      position: fixed;  
      width: 600px;
      height: 420px;
      top: 100px;
      background-color: white;
      border-radius: 10px;
      z-index: 11;
    }
  }
</style>
