<template lang="pug">
  section
    h3 Calendar
    .calendar_wrapper
      table
        tr
          th(v-for="(n, i) in week" v-bind:key="i") {{n}}
        tr
          td
        
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TasksInterface } from '@/interfaces/TasksInterface'

  @Component
  export default class Calendar extends Vue {
    week: string[];

    constructor() {
      super();
      this.week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }
    get tasks() : TasksInterface[] {
      return this.$store.getters.getTasks;
    }
  }
</script>

<style lang="scss">
  .calendar_wrapper {
    margin: 0 auto;
  }
  .calendar_table__header {
    border: 1px solid silver;
  }
</style>