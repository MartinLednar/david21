'use strict';

const body = document.querySelector('body');
const hamburgerBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav-box');
const cartBtn = document.querySelector('.cart-btn');
const cart = document.querySelector('.cart-content');
const cartMinus = document.querySelector('.box-x');
const header = document.querySelector('.hero');
const nav = document.querySelector('header');
const navBackCol = 'rgba(18, 18, 18, 0.95)';
const navHeight = nav.getBoundingClientRect().height;

// //Reveal sections start
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  entry.target.classList.remove('section-hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  rootMargin: '0px',
  threshold: [0.3, 0.4, 0.5, 0.65, 0.85, 0.95, 1],
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});
//Reveal sections end

//Hamburger Start//
hamburgerBtn.addEventListener('click', function () {
  if (!hamburgerBtn.classList.contains('open-hamburger')) {
    hamburgerBtn.classList.add('open-hamburger');
    body.classList.add('mobile-nav-active-body');
    mobileNav.classList.add('mobile-nav-active');
    nav.style.backgroundColor = 'transparent';
  } else {
    hamburgerBtn.classList.remove('open-hamburger');
    body.classList.remove('mobile-nav-active-body');
    mobileNav.classList.remove('mobile-nav-active');
    nav.style.backgroundColor = navBackCol;
  }
});

//Hamburger end//

//Mobile-nav Start//
mobileNav.addEventListener('click', function () {
  hamburgerBtn.classList.remove('open-hamburger');
  body.classList.remove('mobile-nav-active-body');
  mobileNav.classList.remove('mobile-nav-active');
  nav.style.backgroundColor = navBackCol;
});

//Mobile-nav end//

//Cart Start//

cartBtn.addEventListener('click', function () {
  console.log('clicked');
  if (!cart.classList.contains('active-cart')) {
    cart.classList.add('active-cart');
  } else {
    cart.classList.remove('active-cart');
  }
});

cartMinus.addEventListener('click', function () {
  cart.classList.remove('active-cart');
});

//Cart End//

//Sticky nav start

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Sticky nav end
