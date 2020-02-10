<template lang="pug">
  section
    h3 Today
    //- class for icon + wrapper
    .article.article__icon(v-for='(article, index) in articles', :class=" article.icon === 2 ? 'icon-lightblue' : article.icon === 1 ? 'icon-lightyellow' : 'icon-lightgreen' ", v-bind:key='index')
      //- text
      p {{ article.text }}
      .article__time {{ article.time }}
      //- comment
      .article__comment(v-if="article.comment !==''") {{ article.comment }}
      //- image
      .item__images(v-if="article.uploads !==''")
        .cell(v-for='(image, imageIndex) in article.uploads', v-bind:key='imageIndex', @click='sendIndex(imageIndex)')
          img(v-bind:src='image.url', :alt='image.alt')
    //- end of wrapper
</template>


<script lang="ts">
import { ActivityInterface } from '@/interfaces/ActivityInterface';
import { Component, Vue } from 'vue-property-decorator';
import { articles } from '@/store/database.ts';

import { namespace } from 'vuex-class';
const ActivityStore = namespace('activity');

@Component
export default class Activity extends Vue {
  @ActivityStore.State('articles') articles !: ActivityInterface;

  sendIndex(index: number) {
    this.$root.$emit('notify-index', index);
  }
}
</script>


<style lang="scss"  scoped>
  h3 {
    margin: 40px 32px 18px;
  }
  .article {
    margin: 16px 26px 16px 34px;
    .article__comment {
      border-radius: 10px;
      background-color: $item-comment;
      margin: 25px 70px 0 62px;
      padding: 22px 24px 32px;
    }
    .item__images {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 12px 60px;
      .cell {
        width: 105px;
        margin: 10px 5px 0;
        img {
          width: 100%;
          border-radius: 8px;
        }
        img:hover {
          cursor: pointer;
        }
      }
    }
    //icons for articles
    &.article__icon::before {
      margin-right: 22px;
      border-radius: 50%;
      text-align: center;
    }
    &.icon-lightgreen::before {
      content: url('../../assets/images/site/check.svg');
      background-color: $lightgreen;
    }
    &.icon-lightyellow::before {
      content: url('../../assets/images/site/chat.svg');
      background-color: $lightyellow;
    }
    &.icon-lightblue::before {
      content: url('../../assets/images/site/files.svg');
      background-color: $lightblue;
    }
  }
  .article:last-child {
    margin-bottom: 60px;
  }
</style>