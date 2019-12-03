<template lang="pug">
  section
    h3 Today
    .article(v-for='(task, n) in tasks', v-bind:key='n')
      p {{task.text}}
        .article__time {{ task.time }}
</template>


<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  
  @Component
  export default class Tasks extends Vue {
    tasks: {
      text: string,
      time: string
    }[]

    constructor() {
      super();
      this.tasks = [
          { text: "Making bed.", time: "7.00AM" },
          { text: "Washing face.", time: "7.05AM" },
          { text: "Drinking a pint of lemon water.", time: "7.10AM" },
          { text: "Maging breakfast", time: "7.15AM" },
          { text: "Reviewing my goals.", time: "7.45AM" },
          { text: "Writing down two to four important tasks for the day.", time: "7.50AM" }
      ]
    }
  }
</script>





