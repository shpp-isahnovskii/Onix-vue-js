<template>
  <div id="app">
    <fileProject/>
  </div>

</template>

<script>
import fileProject from './components/fileProject';

export default {
  name: 'App',
  components: {
    fileProject
  }
}
</script>

<style lang="scss"> //can't add scss
  @import './assets/styles/media.css';
  @import './assets/styles/style.css';
</style>