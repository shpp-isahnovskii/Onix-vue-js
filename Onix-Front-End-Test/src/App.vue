<template lang="pug">
    layoutComponent#app
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import layoutComponent from './components/Layout.vue';

@Component({
  components: {layoutComponent}
})
export default class App extends Vue {
  mounted() {
    let width = window.innerWidth
    if(width < 970) {
      this.$root.$emit('hide-sidebar', true);
    }
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
    height: 100vh;
  }
</style>
