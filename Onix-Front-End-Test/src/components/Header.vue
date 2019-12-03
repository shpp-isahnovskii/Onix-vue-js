<template lang="pug">
  header
    .header__logo
      img.logo__img(src='../assets/images/site/logo.png', alt='site logo')
      h1 Website Redesign
      .btn.-gray.-rounded.-dotted.-pointer
        .btn__dots ...
    .header__chat
      .chat__imgs
        img.btn.-medium.-rounded.-pointer(v-for='(friend, n) in friends', v-bind:key='n', :src='friend.person', :alt=' friend.alt')
      .btn.-gray.-pointer.btn__share Share
      .btn.-lightyellow.-pointer.btn__chat
        p Chat
    ul.header__navigation
      li(v-for='(name, n) in pages', v-bind:key='n', v-bind:class="{'header__navigation--active' : (name === props[0])}")
        a(@click='changePage(name)', href='#') {{name}}
</template>


<script lang="ts">

  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component({})
  export default class Header extends Vue {
    props: String[];
    pages: String[];
    friends: { person: string, alt: string }[];

    constructor() {
      super();
      this.props = ['Activity'];
      this.pages = ['Tasks', 'Kanban', 'Activity', 'Calendar', 'Files'];
      this.friends = [
        { person : require('../assets/images/people/1.jpg'), alt : "Matt" },
        { person : require('../assets/images/people/2.jpg'), alt : "David" },
        { person : require('../assets/images/people/3.jpg'), alt : "Katty" }
      ];
    }
    changePage(name:string): void {
      this.props = [name];
      this.$root.$emit('content-changed', name);
    }
  }

</script>

<style lang="scss">
  @media screen and (min-width: 320px) {
    /*head*/
    header {
      display: flex;
      flex-wrap: wrap;
      min-width: 670px;
      padding-top: 0.5rem;
      
      .header__logo .logo__img {
        width: 25px;
        margin-left: 10px;
      }
      h1 {
        //logo text
        font-size: 1.5em;
      }
      .header__chat {
        margin-top: 0.5rem;
        margin-left: auto;
      }
    }
  }
  @media screen and (min-width: 1100px) {
  /*header*/
    header {
      display: flex;
      flex-wrap: wrap;
      min-height: 115px;
      padding-top: 30px;
      .header__logo {
        min-height: 60px;
      }
      .header__logo .logo__img {
        width: 40px;
        margin-left: 30px;
      }
      h1 {
        //logo text
        font-size: 2em;
      }
      .header__chat {
        margin-left: auto;
      }
      .header__navigation {
        flex-basis: 100%;
      }
    }
  }
  .btn {
      &.btn__chat::before {
      content: url("../assets/images/site/chats.svg");
      margin-left: 16px;
      margin-right: 4px;
    }
  }
  /* header */
  header {
    background-color: $white;
    
    .header__logo {
      display: flex;
      align-items: center;
      .logo__img {
        //logo
        background: $yellow;
        border-radius: 6px;
      }
      h1 {
        //logo text
        font-weight: normal;
        margin: 0 1rem;
        letter-spacing: 0.033em;
      }
    }
    /* chat */
    .header__chat {
      display: flex;
      align-items: center;
      .chat__imgs img {
        margin-right: 2px;
      }
      .chat__imgs img:last-child {
        margin-right: 18px;
      }
    }
    /* navigation menu */
    .header__navigation {
      display: flex;
      list-style-type: none;
      justify-content: flex-start;
      align-items: flex-end;
      margin: 10px 0 0 0;
      padding: 0;
      li {
        border-bottom: 2px solid transparent;
        padding: 0 18px 14px 18px;
        list-style-type: none;
      }
      li:first-child {
        padding-left: 30px;
      }
      li:hover a {
        opacity: 1;
      }
      a {
        font-size: $frstFontSize;
        text-decoration: none;
        opacity: 0.7;
        color: $mainFontColor;
      }
      .header__navigation--active {
        border-bottom: 2px solid $yellow;
        a {
          opacity: 1;
        }
      }
    }
  }
</style>
