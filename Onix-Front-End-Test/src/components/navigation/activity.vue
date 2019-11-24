<template>
  <section>
    <h3>Today</h3>
    <!-- class for icon + wrapper -->
    <div 
      v-for="(article, index) in articles" 
      class="article article__icon" 
      :class=" article.icon === 2 ? 'icon-lightblue' : article.icon === 1 ? 'icon-lightyellow' : 'icon-lightgreen' " 
      v-bind:key="index"
    >
    <!-- text -->
      <p>{{ article.text }}</p>
      <div class="article__time">{{ article.time }}</div>
    <!-- coment -->
      <div v-if="article.comment !==''" class="article__comment">{{ article.comment }}</div>
    <!-- image -->
      <div v-if="article.uploads !==''" class="item__images">
        <div class="cell" v-for="(image, imageIndex) in article.uploads" v-bind:key="imageIndex">
          <img v-bind:src="image.url" :alt="image.alt" />
        </div>
      </div>
    </div>
    <!-- end of wrapper -->
  </section>
</template>


<script>
  export default {
    name: 'activity',
    data() {
      return {
        articles: [
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
                  { url: require("../../assets/images/temporary/3.jpg"), alt: 'fourth file'}]
          } 
        ],
      }
    }
  }

</script>


<style lang="scss">

</style>