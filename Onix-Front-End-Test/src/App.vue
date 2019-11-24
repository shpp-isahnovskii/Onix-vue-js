<template>
    <Layout id="app"/>
</template>

<script>
import Layout from './components/Layout';

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
  }
    //page wrapper
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