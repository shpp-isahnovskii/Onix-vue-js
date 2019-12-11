<template lang="pug">
  section
    h3 Today
    //- class for icon + wrapper
    .article.article__icon(v-for='(article, index) in articles', :class=" article.icon === 2 ? 'icon-lightblue' : article.icon === 1 ? 'icon-lightyellow' : 'icon-lightgreen' ", v-bind:key='index')
      //- text
      p {{ article.text }}
      .article__time {{ article.time }}
      //- coment
      .article__comment(v-if="article.comment !==''") {{ article.comment }}
      //- image
      .item__images(v-if="article.uploads !==''")
        .cell(v-for='(image, imageIndex) in article.uploads', v-bind:key='imageIndex', @click='sendIndex(imageIndex)')
          img(v-bind:src='image.url', :alt='image.alt')
    //- end of wrapper
</template>


<script lang="ts">
  import { ActivityInterface } from '../../interfaces/ActivityInterface'
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Activity extends Vue {
    articles: ActivityInterface[];
    constructor() {
      super();
      this.articles = [
        {
          icon: 0,  //"done"
          text: "Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users",
          time: "8:40PM",
          comment: '',
          uploads: ''
        },
        {
          icon: 1, //"comment"
          text: "Emilee Simchenko commented on Account for teams and personal in bottom style",
          time: "7:32PM",
          comment: "During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes",
          uploads: ''
        },
        {
          icon: 2, //"upload"
          text: "Darika Samak uploaded 4 files on An option to search in current projectsor in all projects",
          time: "6:02PM",
          comment: '',
          uploads: [ 
            { url: require("../../assets/images/temporary/0.jpg"), alt: 'first file' },
            { url: require("../../assets/images/temporary/1.jpg"), alt: 'second file'},
            { url: require("../../assets/images/temporary/2.jpg"), alt: 'third file' },
            { url: require("../../assets/images/temporary/3.jpg"), alt: 'fourth file'}
          ]
        } 
      ]
    }
    sendIndex(index : number) {
      this.$root.$emit('notify-index', index);
    }
  }
</script>


<style lang="scss">
</style>