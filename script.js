'use strict';

///////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tab=document.querySelectorAll('.operations__tab'); //button
const tabContainer=document.querySelector('.operations__tab-container');  //all btn into div
const tabsContent=document.querySelectorAll('.operations__content'); //btn down div
const nav= document.querySelector('.nav');
const section1= document.querySelector('#section--1');

// Modal window


// console.log(btnsOpenModal);
/**
NodeList(2) [ a.nav__link.nav__link--btn.btn--show-modal, button.btn.btn--show-modal ]
 */

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));
// mouse click close modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// keyboard close modal
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// navigation 

///////////// querySelector find children ////////////////
document.querySelector('.nav__links').addEventListener('click', (e)=>{
  e.preventDefault();
  // console.log(e);
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// tabbed component


// BAD PRACTICE. Never use it.Bcz, when we have more btn then call back function create more copies, that is create a page slow down.

// tab.forEach(t=>t.addEventListener('click', ()=>console.log('TAB')));


tabContainer.addEventListener('click', function(e){
  const clicked= e.target.closest('.operations__tab');
  // console.log(clicked);
  
  
  if(!clicked) return; // when clicked then execute next line code

  // remove activate classes
  tab.forEach(t=>t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
  

  // Active tab
  clicked.classList.add('operations__tab--active');
 

  // Active content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

const handleHover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link= e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    
    siblings.forEach(el=>{
      if(el !== link) el.style.opacity= this;
    });
    logo.style.opacity= this;
  }
}

// Menu fade animation

// nav.addEventListener('mouseover', (e)=>{
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', (e)=>{
//   handleHover(e, 1);
// });

/////////// WE CAN USE BIND METHOD HERE FOR DIRECTLY CALL THE FUNCTION AND PASS VALUES //////////

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCords= section1.getBoundingClientRect(); // section er window position
// console.log(initialCords);
// window.addEventListener('scroll', ()=>{
//   console.log(window.scrollY); // scroll position number

//   if(window.scrollY > initialCords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// });

// BETTER WAY TO STICKY NAVIGATION
const header=document.querySelector('.header');
const navHeight= nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav=function(entries){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver= new IntersectionObserver(stickyNav, {
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);


// intersection observing scroll effects
const allSection=document.querySelectorAll('.section');
const revealSection= function(entries, observer){
  const [entry]=entries;
  console.log(entry);

  if(!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver= new IntersectionObserver(revealSection, {
  root:null,
  threshold:0.15,
});

allSection.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

// Lazy loading images
const imgTarget= document.querySelectorAll('img[data-src]');
const loading= function(entries, observer){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;
  //  replace src with data-src
  entry.target.src = entry.target.dataset.src;
  

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver=new IntersectionObserver(loading, {
    root: null,
    threshold:0,
    rootMargin:'-200px', 
});
imgTarget.forEach(img=>imgObserver.observe(img));

// Slider
const slides= document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
const slider= document.querySelector('.slider');
slider.style.transform= 'visible';


let currentSlide=0;
const maxSlide= slides.length;

const goToSlide= function(slide){
  slides.forEach((s, i)=>s.style.transform= `translateX(${100*(i-slide)}%)`);
}
goToSlide(0);

// Next slide
const nextSlide= function(){
  if(currentSlide === maxSlide-1){
    currentSlide = 0;
  }else{
    currentSlide ++;
  };
  
  goToSlide(currentSlide);
}

const previousSlide= function(){
  if(currentSlide === 0){
    currentSlide= maxSlide-1;
  }else{
    currentSlide--;
  }
  
  goToSlide(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);




// ////////////////// EXTRA //////////////////////

// Going downwards: child
// const h1=document.querySelector('h1');
// console.log(h1.childNodes);
// h1.firstElementChild.style.color='white';
// h1.lastElementChild.style.color='orangered';

// Going upwards: parents
// console.log('upwards:',h1.parentNode);
// console.log('upwards:',h1.parentElement);

///////////// closest find parent ////////////////
// h1.closest('.header').style.background='var(--gradient-secondary)';




// scrolling
// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const section1=document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', (e)=>{
//   // const scrolling=section1.getBoundingClientRect();
//   // console.log(scrolling);
//   // console.log(e.target.getBoundingClientRect());

//   section1.scrollIntoView({behavior: 'smooth'});
// });

// navigation .. not to use
// document.querySelectorAll('.nav__link').forEach((el)=>{
//   el.addEventListener('click', function(e){
//     e.preventDefault();
  
//     // console.log('link');
//     const id=this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior:'smooth'
//     });
//   });
// });



////////////////////////////// EXTRA /////////////////////////
// bubble phase
// rgb(255,255,255)
// random number function
// const randomInt=(min, max)=>Math.floor(Math.random()*(max-min+1)+min);

// // random color function
// const randomColor=()=>`rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

// // link
// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor=randomColor();
//   console.log('link', e.target);
//   // stop propagation
//   e.stopPropagation();
// });

// // links container
// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor=randomColor();
//   console.log('links container', e.target);
// });

// //nav container 
// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor=randomColor();
//   console.log('nav container', e.target);
// });




