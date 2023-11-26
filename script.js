'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
console.log(btnsOpenModal);
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

// navigation 
document.querySelector('.nav__links').addEventListener('click', (e)=>{
  e.preventDefault();
  console.log(e);
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})


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




