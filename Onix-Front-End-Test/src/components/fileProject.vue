<template>
  <div class="page">
    <div id="sidebar" class="sidebar"> <!-- toggle-bar -->
    <div class="sidebar__search">
      <img id="toggleButton" class="btn -pointer sidebar-opener" src="../assets/images/site/side-burger.svg" alt="menu button"> <!-- toggle button -->
      <p>PROJECTUS</p>
      <img class="search__icon" src="../assets/images/site/search.svg" alt="search">
    </div>
    <div class="sidebar__avatar btn -avatar">
      <img src="../assets/images/people/avatar.jpg" alt="avatar">
      <div class="avatar__details">
        <p class="avatar__name">Jean Gonzales</p>
        <p class="avatar__role">Product Ovner</p>
      </div>
      <div class="btn -medium -rounded -dotted -pointer">
        <div class="btn__dots">...</div>
      </div>
    </div>
    <div class="sidebar__tasks">
      <div class="tasks__closed">
        <p id="tasksClosed">372</p> <!-- tasks closed -->
        <p>Completed Tasks</p>
      </div>
      <div class="tasks__open" >
        <p id="tasksOpen">3</p> <!-- tasks open -->
        <p>Open Tasks</p>
      </div>
    </div>
    <div class="sidebar__menu">
      <ul>
        <li class="sidebar__menu--active"><a href="#">MENU</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">My Tasks</a></li>
        <li><a href="#">Notofications<div class="menu__notifications btn -small -rounded -yellow">3</div></a></li>
      </ul>
    </div>
  </div>
  <div class="mainbar">

    <header>
      <div class="header__logo">
        <img class="logo__img" src="../assets/images/site/logo.png" alt="site logo">
        <h1>Website Redesign</h1>
        <div class="btn -gray -rounded -dotted -pointer">
          <div class="btn__dots">...</div>
        </div>
      </div>
      <div class="header__chat">
        <div class="chat__imgs">
          <img class="btn -medium -rounded -pointer" src="../assets/images/people/1.jpg" alt="person1">
          <img class="btn -medium -rounded -pointer" src="../assets/images/people/2.jpg" alt="person2">
          <img class="btn -medium -rounded -pointer" src="../assets/images/people/3.jpg" alt="person3">
        </div>
        <div class="btn -gray -pointer btn__share">Share</div>
        <div class="btn -lightyellow -pointer  btn__chat">
          <p>Chat</p>
        </div>
      </div>
      <ul class="header__navigation">
        <li><a href="#">Tasks</a></li>
        <li><a href="#">Kanban</a></li>
        <li class="header__navigation--active"><a href="#">Activity</a></li>
        <li><a href="#">Calendar</a></li>
        <li><a href="#">Files</a></li>
      </ul>
    </header>

    <div class="section__wrapper">
      <section>
        <h3>Today</h3>

        <div class="article article__icon icon-lightgreen">
          <p>Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users</p>
          <div class="article__time">8:40PM</div>
        </div>

        <div class="article article__icon icon-lightyellow">
          <p>Emilee Simchenko commented on Account for teams and personal in bottom style</p>
          <div class="article__time">7:32PM</div>
          <div class="article__comment">During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes</div>
        </div>

        <div class="article article__icon icon-lightblue">
          <p>Darika Samak uploaded 4 files on An option to search in current projects or in all projects</p>
          <div class="article__time">6:02PM</div>

          <div class="item__images">
            <div class="cell"><img src="../assets/images/temporary/0.jpg" alt="first file"></div>
            <div class="cell"><img src="../assets/images/temporary/1.jpg" alt="second file"></div>
            <div class="cell"><img src="../assets/images/temporary/2.jpg" alt="third file"></div>
            <div class="cell"><img src="../assets/images/temporary/3.jpg" alt="fourth file"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  //... some data for images up here
}

const CLOSE_THE_TASK = 'Are you sure you want to change the number of tasks?';

window.onload = () => {

  const sidebar = document.getElementById('sidebar');

  //close sidebar if started window width less then 970px
  if (window.innerWidth < 970) { 
    sidebar.classList.add('hidden');
  }

  const toggleButton = document.getElementById('toggleButton');

  /*Event: open/close sidebar menu */
  toggleButton.addEventListener('click', () => { sidebar.classList.toggle("hidden"); });
  

  const imagesArr = document.querySelectorAll('.item__images > div');
  const menuNotifications = document.querySelector('.menu__notifications');

  /*Event: change notification counter to the image index number*/
  imagesArr.forEach( (element, index) => {
    element.addEventListener('click', () => {
      menuNotifications.innerHTML = index;
   });
  });


  const tasksOpen = document.getElementById('tasksOpen');
  const innerTasksClosed = document.getElementById('tasksClosed'); //num amount
  const outertTaskClosed = document.querySelector('.tasks__closed'); //outer block

  /*Event: ask user to close a task*/
  outertTaskClosed.addEventListener( 'click', () => {
    if( (tasksOpen.innerHTML > 0) ) { //if have open tasks
      if( confirm(CLOSE_THE_TASK) ) { //if change confirmed
        tasksOpen.innerHTML--;
        innerTasksClosed.innerHTML++;
      }
    } else { 
      alert("You have no tasks to close"); //if no tasks
    }
  });
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>