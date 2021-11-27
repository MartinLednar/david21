const exampleBtn = document.querySelector('.contact-link');
const exampleOverlay = document.querySelector('.example-overlay');
const closeExampleBtn = document.querySelector('.close-overlay');

exampleBtn.addEventListener('click', function () {
  exampleOverlay.classList.remove('hidden-overlay');
  exampleOverlay.closest('body').style.overflow = 'hidden';
});

exampleOverlay.addEventListener('click', function () {
  exampleOverlay.classList.add('hidden-overlay');
  exampleOverlay.closest('body').style.overflow = 'visible';
});

closeExampleBtn.addEventListener('click', function () {
  exampleOverlay.classList.add('hidden-overlay');
  exampleOverlay.closest('body').style.overflow = 'visible';
});

//Form contact file input//
const fileInput = document.querySelector('.example-file');
const errMessage = document.querySelector('.error-big-file');

fileInput.addEventListener('change', function () {
  const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2);

  if (fileSize > 10) {
    this.value = null;
    errMessage.classList.remove('hidden-overlay');
  } else {
    errMessage.classList.add('hidden-overlay');
  }
});
//Form contact file input//

//Form contact file input//
const headerNav = document.querySelector('header');
const navMessage = document.querySelector('.nav-msg-box');
const navMessageClose = document.querySelector('.close-nav-msg');

if (!navMessage) {
  headerNav.style.paddingTop = '2rem';
} else {
  navMessageClose.addEventListener('click', function () {
    navMessage.classList.add('hidden-overlay');
    headerNav.style.paddingTop = '2rem';
  });
}

// padding-top: 2rem;

//Form contact file input//

const slider = function () {
  const sliderBox = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('#arr-l');
  const btnRight = document.querySelector('#arr-r');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlide = slides.length;
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  //functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="dot" data-slide="${i}"></div>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dot')
      .forEach(dot => dot.classList.remove('dot-active'));

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add('dot-active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.classList.remove('active-slide');
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });

    slides[slide].classList.add('active-slide');
  };

  //Next slide
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }

    goToSlide(currSlide);
    //-100%,0%,100%,200%
    activateDot(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }

    goToSlide(currSlide);
    activateDot(currSlide);
  };
  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
    //0%,100%,200%,300%
  };
  init();
  //event handlers
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);

    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  let interval = setInterval(nextSlide, 6000);

  sliderBox.addEventListener('mouseover', function () {
    clearInterval(interval);
  });

  sliderBox.addEventListener('mouseout', function () {
    interval = setInterval(nextSlide, 6000);
  });
};

slider();
