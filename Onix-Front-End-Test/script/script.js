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
  const tasksClosed = document.getElementById('tasksClosed');

  /*Event: ask user to close a task*/
  tasksClosed.addEventListener('click', closeTheTask);


  /* Change tasks counters */
  function closeTheTask() {
    if(confirm(CLOSE_THE_TASK) ) {
      console.log(tasksClosed.innerHTML);
      
      if (tasksOpen.innerHTML > 0) {
        tasksOpen.innerHTML--;
      }
      tasksClosed.innerHTML++;
    }
  }
}



