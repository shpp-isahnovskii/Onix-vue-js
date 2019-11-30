<template lang="pug">
  div
    sidebarPart
    .column
      headerPart
      contentPart
</template>

<script>
import sidebarPart from './Sidebar';
import headerPart from './Header';
import contentPart from './Content';

  export default {
    name: 'Layout',
    components: {
      sidebarPart,
      headerPart,
      contentPart
    }
  }

</script>

<style lang="scss">
  .column {
    width: 100%;
    height: 100%;
  }
</style>