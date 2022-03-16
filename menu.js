const m = document.querySelector('.main')
const overlay = document.querySelector('.overlay')

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    overlay.classList.remove('hidden')    
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    overlay.classList.add('hidden') 
}

overlay.addEventListener('click', () => {
    closeNav()
})