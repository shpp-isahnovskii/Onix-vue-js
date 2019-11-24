<template>
  <div id="sidebar" class="sidebar"  v-bind:class="{ 'hidden' : sidebarStatus }"> <!-- toggle-bar -->
    <div class="sidebar__search">
      <img @click="sidebarToggle()"
      class="btn -pointer sidebar-opener"
      src="../assets/images/site/side-burger.svg" alt="menu button"> <!-- toggle button -->
      <p>{{user.company}}</p>
      <img class="search__icon" src="../assets/images/site/search.svg" alt="search">
    </div>
    <div class="sidebar__avatar btn -avatar">
      <img :src="user.personal.avatar" alt="avatar">
      <div class="avatar__details">
        <p class="avatar__name">{{user.personal.name}}</p>
        <p class="avatar__role">{{user.personal.role}}</p>
      </div>
      <div class="btn -medium -rounded -dotted -pointer">
        <div class="btn__dots">...</div>
      </div>
    </div>
    <div class="sidebar__tasks">
      <div class="tasks__closed">
        <p id="tasksClosed">{{user.tasks.closed}}</p> <!-- tasks closed -->
        <p>Completed Tasks</p>
      </div>
      <div class="tasks__open" >
        <p id="tasksOpen" @click="changeCounter()" >{{user.tasks.open}}</p> <!-- tasks open -->
        <p>Open Tasks</p>
      </div>
    </div>
    <div class="sidebar__menu">
      <ul>
        <li class="sidebar__menu--active"><a href="#">MENU</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">My Tasks</a></li>
        <li><a href="#">Notofications<div class="menu__notifications btn -small -rounded -yellow">{{user.notifications}}</div></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user : {
          company: 'PROJECTUS',
          personal: {
            avatar: require('../assets/images/people/avatar.jpg'),
            name: 'Jean Gonzales',
            role: 'Product Ovner',
          },
          tasks: {
            open: 11,
            closed: 372
          },
          notifications: 3
        },
        sidebarStatus: false
      }
    },
    methods : {
      //close a task
      changeCounter() {
        let closeTheTask = 'Are you sure you want to change the number of tasks?';
        if(this.user.tasks.open > 0) {
          if(confirm(closeTheTask) ) {
            this.user.tasks.open--;
            this.user.tasks.closed++;
          }
        }
        else {
          alert("You have no tasks to close");
        }
      },
      //hide-show sidebar
      sidebarToggle() {
        this.sidebarStatus = !this.sidebarStatus;
      }
    },
    //change image index event for notify element
    mounted() {
      this.$root.$on('notify-index', (index)=> {
        this.user.notifications = index;
      });
    }
  }
</script>


<style lang="scss">
@media screen and (min-width: 320px) {

  .sidebar {
    min-width: 286px;
    overflow-x: hidden;
    & > * {
      display: flex;
    }
    & > * > *:first-child {
      margin-left: 0.2rem;
    }
    & > * > *:first-child { //all elements aligin left
      margin-left: 1.8rem;
    }

    .sidebar__search {
      .search__icon {
        margin-right: 1.4rem;
      }
    }
    .menu__notifications {
      font-size: 0.9rem;
      padding-right: 1px;
    }

    &.hidden {
      min-width: 80px;
      width: 80px;

      & > *:not(:first-child) {
       display: none;
      }
      & > *:first-child > *:not(:first-child) {
        display: none;
      }
    }
  }
}
//@media end

/* left-side menu */
.sidebar {
  color: $white;
  background-color: $sidemenuBackGround;
  font-size: $secondFontSize;
  font-weight: normal;

  .sidebar__search {
    margin-top: 2.2rem;
    & p {
      margin: 0;
    }
    letter-spacing: 0.11rem;
    * {
      margin-right: 1rem;
    }
    .search__icon {
      margin-left: auto;
    }
  }
  .sidebar__avatar {
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    margin-top: 2.0rem;
    padding: 1.2rem 0;
    align-items: center;
    background-color: $sidebar-avatar-background;
    p {
      margin: 0rem 0 0.1rem 1rem;
    }
    .btn {
      margin-left: auto;
      margin-right: 1rem;
    }
    .avatar__role {
      font-size: 12px;
      color: $sidebar-color;
    }
  }
  .sidebar__tasks {
    * {
      p:first-child {
        margin-bottom: 0;
        font-size: 1.3rem;
      }
      p:last-child {
        margin-top: 0;
        font-size: 12px;
        color: $sidebar-color;
      }
      p:first-child:hover {
        cursor: pointer;
        color: $yellow;
      }
    }
    .tasks__open {
      margin-left: 1.3rem;
    }
  }
  .sidebar__menu {
    ul {
      margin-top: 1.5rem;
      padding: 0;
      flex-direction: column;
      li {
        margin-top: 1.3rem;
        list-style-type: none;
        a {
          color: $white;
          text-decoration: none;
        }
      }
      li:first-child {
        margin-top: 0;
      }
      li:hover a {
        color: $gray;
      }
    }
    .sidebar__menu--active a {
      color: $sidebar-color;
    }
  }
  .menu__notifications {
    display: inline-block;
    text-align: center;
    margin-left: 0.6rem;
    color: $mainFontColor;
    font-weight: bold;
  }

}
/* end of side menu */
</style>
