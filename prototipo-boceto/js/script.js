
const nav = document.querySelector(".nav-bar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    nav.style.transform = "translateY(0)";
  }  else {
    nav.style.transform = "translateY(-100%)";
  }
});

 

/*
let alredyScrolled = false;

window.addEventListener("wheel", (e) => {
  if (!alredyScrolled && e.deltaY > 0) {
    e.preventDefault();
    alredyScrolled = true;

    document.getElementById("carta").scrollIntoView({
      behavior: "smooth"
    });
    setTimeout(() => alredyScrolled = false, 1000);
  }

}, {passive: false });
*/

let alredyScrolled = false;

window.addEventListener("wheel", (e) => {
  if (!alredyScrolled && e.deltaY > 0) {
    e.preventDefault();
    alredyScrolled = true;

gsap.to(window, {
  duration: 1.86,
  scrollTo: ".hero2",
  //onComplete: () => alredyScrolled = false
});
  }

}, {passive: false });