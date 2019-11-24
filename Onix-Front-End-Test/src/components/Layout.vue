<template>
  <div>
    <SideBar/>
    <div class="rColumn">
      <Header/>
      <Content/>
    </div>
  </div>
</template>

<script>
import SideBar from './Sidebar';
import Header from './Header';
import Content from './Content';

  export default {
    name: 'Layout',
    components: {
      SideBar,
      Header,
      Content
    }
  }

</script>

<style lang="scss">
  .rColumn {
    width: 100%;
  }
</style>