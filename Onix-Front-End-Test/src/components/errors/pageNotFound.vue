<template lang='pug'>
    div this page is not found! 😔
</template>


<script lang='ts'>
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class pageNotFound extends Vue {
  }
</script>

<style lang="scss" scoped>
  div {
    margin-top: 100px;
    font-size: 20px;
  }
</style>