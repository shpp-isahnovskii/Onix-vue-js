const CLOSE_THE_TASK = 'Are you sure you want to change the number of tasks?';

window.onload = () => {

  const sidebar = document.getElementById('sidebar');

  //close sidebar if started window width less then 970px
  if (window.innerWidth < 970) { 
    sidebar.classList.add('hidden');
  };


  
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



