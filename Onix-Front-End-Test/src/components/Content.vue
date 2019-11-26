<template>
  <div class="section__wrapper">
    <component :is="pageContent" /> <!--example: https://blog.logrocket.com/how-to-make-your-components-dynamic-in-vue-js/ -->
  </div>
</template>



<script>
  import Activity from './navigation/activity';
  import Tasks from './navigation/tasks';
  import Kanban from './navigation/kanban';
  import Calendar from './navigation/calendar';
  import Files from './navigation/files';
  
  export default {
    name: 'Content',
    components: {
      Activity,
      Tasks,
      Kanban,
      Calendar,
      Files
    },
    mounted() { //link for tutorial: https://flaviocopes.com/vue-components-communication/
      this.$root.$on('content-changed', (newContent) => {
        this.pageContent = newContent;
      });
    },
    data() {
      return {
        pageContent: 'Activity'
      }
    }
  }

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

    h3 {
      margin: 40px 32px 18px;
      text-transform: uppercase;
      opacity: 0.5;
      font-size: $secondFontSize;
    }

    .article {
      display: flex;
      flex-wrap: wrap;
      margin: 16px 26px 16px 34px;
      line-height: 1.25em;

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
        content: url('../assets/images/site/check.svg');
        background-color: $lightgreen;
      }
      &.icon-lightyellow::before {
        content: url('../assets/images/site/chat.svg');
        background-color: $lightyellow;
      }
      &.icon-lightblue::before {
        content: url('../assets/images/site/files.svg');
        background-color: $lightblue;
      }
    }
    .article:last-child {
      margin-bottom: 60px;
    }
  }
/* end of main section */
</style>