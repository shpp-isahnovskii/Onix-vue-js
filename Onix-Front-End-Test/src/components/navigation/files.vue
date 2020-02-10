<template lang="pug">
  section
    h3 Files
    div(v-for="article in articles" v-if="article.uploads !== ''")
      div(class="files__img_block") {{article.text}}
        div(v-for="upload in article.uploads" class="img_block__file")
          img(:src="upload.url" :alt="upload.alt")
          span {{upload.alt}}
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ActivityInterface } from '@/interfaces/ActivityInterface';
  import { articles } from '@/store/database.ts';

  import { namespace } from 'vuex-class';
  const ActivityStore = namespace('activity');

  @Component
  export default class Files extends Vue {
    @ActivityStore.State('articles') articles !: ActivityInterface;
  }
</script>

<style lang="scss">
  .files__img_block {
    margin: 0 auto;
    max-width: 600px;
    background-color: $item-comment;
    display: block;
    border-radius: 8px;
    padding: 20px;
    .img_block__file {
      margin: 10px;
      background-color: rgb(230, 230, 230);
      border-radius: 8px;
      padding: 10px;
      img {
        width: 150px;
        height: 150px;
      }
      span {
        margin-left: 10px;
        height: 150px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
      }
    }
  }
</style>