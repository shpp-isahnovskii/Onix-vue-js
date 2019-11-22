<template>
  <div id="app">
    <sidebarSection />
    <div>
      <headerSection />
      <mainbarSection />
    </div>
  </div>

</template>

<script>
import sidebarSection from './components/sidebarSection';
import headerSection from './components/headerSection';
import mainbarSection from './components/mainbarSection';


export default {
  name: 'App',
  components: {
    sidebarSection,
    headerSection,
    mainbarSection
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