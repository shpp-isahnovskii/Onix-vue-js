<template lang="pug">
    layoutComponent#app
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import layoutComponent from './components/Layout.vue';
import { TasksInterface } from './interfaces/TasksInterface';
import axios from "axios"

@Component({
  components: {layoutComponent}
})
export default class App extends Vue {
  created() {
    axios.get('https://nameless-leaf-8405.getsandbox.com/api/tasks')
    .then( response => {
      // eslint-disable-next-line no-console
      console.log(response.data);
      
    })
  }

  mounted() {
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
