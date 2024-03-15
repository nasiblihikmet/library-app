let header_menu = document.querySelector("#header_menu")
let overlay = document.querySelector("#overlay")
let close_icon = document.querySelector("#close_icon")

const body = document.body

header_menu.addEventListener('click',function(){
    overlay.classList.add("show")
    body.style.overflow = 'hidden';
})

close_icon.addEventListener('click',function(){
    overlay.classList.remove("show")
    body.style.overflow = 'visible';
})







