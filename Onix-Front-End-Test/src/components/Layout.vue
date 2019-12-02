<template lang="pug">
  div
    sidebarPart
    .column
      headerPart
      contentPart
</template>

<script lang="ts">
  import sidebarPart from './Sidebar.vue';
  import headerPart from './Header.vue';
  import contentPart from './Content.vue';

  import { Component, Vue } from 'vue-property-decorator';
  @Component({
    components: { headerPart, sidebarPart, contentPart }
  })
  export default class Layout extends Vue {}
</script>

<style lang="scss">
  .column {
    width: 100%;
    height: 100%;
  }
</style>