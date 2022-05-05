
const hamburger = document.querySelector(".hamburger");
const mobile_Menu = document.querySelector(".header .nav-bar .nav-list ul");
const header = document.querySelector(".header");
const menuItem = document.querySelectorAll(".nav-link");


hamburger.addEventListener("click", ()=>{

    hamburger.classList.toggle("active");
    mobile_Menu.classList.toggle("active");
})

document.addEventListener("scroll", ()=>{

    var scrollPosition = window.scrollY;

    if(scrollPosition > 250){
        header.style.background = "#29323c";
    }
    else{
        header.style.background = "transparent";
    }
})

menuItem.forEach((item)=>{

    item.addEventListener("click",()=>{
        hamburger.classList.toggle("active");
        mobile_Menu.classList.toggle("active");
    });

});

