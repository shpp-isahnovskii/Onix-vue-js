<template lang="pug">
    layoutComponent#app
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import layoutComponent from './components/Layout.vue';
import { TasksInterface } from './interfaces/TasksInterface';
import { EventBusTasks } from '@/main'

@Component({
  components: {layoutComponent}
})
export default class App extends Vue {
  tasks: TasksInterface[];

  constructor() {
    super();
    this.tasks = [];
  }
  
  mounted() {
    let width = window.innerWidth
    if(width < 970) {
      this.$root.$emit('hide-sidebar', true);
    }
  }
  /* sidebar menu set 'open tasks' counter*/
  setTasks() {
    let counter: number = 0;
    this.tasks.forEach( e => {
      counter += e.subtasks.length;
    });
    EventBusTasks.$emit('set-tasks-count', counter);
  }
}
</script>


<style lang="scss">
  body {
    margin: 0;
  }
  #app {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 800px;
    font-family: $mainFont;
    color: $mainFontColor;
    background-color: $mainBGColor;
  }
</style>
