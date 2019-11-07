const sidebar = document.getElementById('toggleBar');

window.onload = () => {
  if (window.innerWidth < 970) { 
    sidebar.classList.add('hidden');
  };
}

function toggle() {
  sidebar.classList.toggle("hidden");
}
