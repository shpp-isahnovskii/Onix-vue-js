<template lang="pug">
    layoutComponent#app
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import layoutComponent from './components/Layout.vue';
import { TasksInterface } from './interfaces/TasksInterface';

import { namespace } from "vuex-class"

const TaskStore = namespace('tasks');

@Component({
  components: {layoutComponent}
})
export default class App extends Vue {
  @TaskStore.Action('fetchTasks') fetchTasks !: Function;
  @TaskStore.Mutation('loadTasks') loadTasks !: Function;

  created() {
    this.fetchTasks().then( (response : any) => this.loadTasks(response));
  }

  mounted() {
    this.initWave();
  }
  initWave() {
    let width = window.innerWidth
    if(width < 970) {
      this.$root.$emit('hide-sidebar', true);
    }
    this.$root.$emit('make-wave'); //add animation wave to the sidebar
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
