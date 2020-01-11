<template lang="pug">
  .section__wrapper
    router-view
</template>



<script lang="ts">
import activityPage from './navigation/activity.vue'
import tasksPage from './navigation/tasks.vue'
import kanbanPage from './navigation/kanban.vue'
import calendarPage from './navigation/calendar.vue'
import filesPage from './navigation/files.vue'
import pageNotFound from './errors/pageNotFound.vue'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    activityPage,
    tasksPage,
    kanbanPage,
    calendarPage,
    filesPage,
    pageNotFound
  }
})
export default class Content extends Vue {}
</script>

<style lang="scss">
@media screen and (min-width: 320px) {
  //main bar
  section {
    margin: 30px 10px;
    flex-basis: 770px;
    min-width: 570px;
    align-self: flex-start;
  }
  p {
    flex-basis: 380px;
  }

  .section__wrapper {
    padding-bottom: 100px;
  }
  .article {
    &.article__icon::before {
      height: 40px;
      width: 40px;
      line-height: 40px;
    }
    &.icon-lightblue::before {
      line-height: 43px;
    }
  }
}
@media screen and (min-width: 1100px) {
  //main section
  section {
    p {
      flex-basis: 490px;
    }
  }
}
@media screen and(min-width: 1440px) {
  .section__wrapper {
    padding-bottom: 150px;
  }
}
/* main section */
.section__wrapper {
  display: flex;
  min-height: 600px;
  justify-content: center;
}
section {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  background-color: $white;
  padding-bottom: 26px;
  border-radius: 8px;
}
h3 {
  text-transform: uppercase;
  opacity: 0.5;
  font-size: $secondFontSize;
}
  .article {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.25em;
    position: relative;

    .item__logo {
      margin-right: 20px;
    }
    .article__time {
      font-size: $secondFontSize;
      opacity: 0.7;
      float: right;
      margin-left: auto;
      margin-right: 10px;
    }
    p {
      margin: 0;
    }
  }
</style>