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

//////////////////////////Beats////////////////////////////
if (document.querySelector('.audio')) {
  const musicContainers = document.querySelectorAll('.beat');
  const playBtns = document.querySelectorAll('.play-icon');

  const audios = document.querySelectorAll('.audio');
  const progress = document.querySelector('.progress');
  const progressContainers = document.querySelectorAll('.progress-container');

  //Current song
  let currSong = document.querySelector('.beat');
  let audio = currSong.querySelector('.audio');
  let clickedSong;

  function playSong(song) {
    song.classList.add('play');
    song
      .querySelector('.play-icon')
      .querySelector('use')
      .setAttribute('xlink:href', '/img/feather-sprite.svg#pause');

    audio.play();
  }

  function pauseSong(song) {
    song.classList.remove('play');
    song
      .querySelector('.play-icon')
      .querySelector('use')
      .setAttribute('xlink:href', '/img/feather-sprite.svg#play');
    audio.pause();
  }

  function loadSong(song) {
    song.classList.remove('play');
    song
      .querySelector('.play-icon')
      .querySelector('use')
      .setAttribute('xlink:href', '/img/feather-sprite.svg#play');

    refreshProgress();
  }

  function refreshProgress() {
    audio.load();
    currSong.querySelector('.mins').innerHTML = '0';
    currSong.querySelector('.secs').innerHTML = '00';
    currSong.querySelector('.progress').style.width = '0';
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const changeMins = Math.trunc(currentTime / 60);
    let changeSecs = Math.trunc(currentTime % 60);

    if (changeSecs < 10) {
      changeSecs = '0' + changeSecs;
    }

    currSong.querySelector('.mins').innerHTML = changeMins;
    currSong.querySelector('.secs').innerHTML = changeSecs;
    const progressPercent = (currentTime / duration) * 100;
    currSong.querySelector('.progress').style.width = `${progressPercent}%`;
  }

  function setProgress(e) {
    const width = e.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  function renderTimes(song) {
    const timeBox = song.querySelector('.time-wrapper');
    const songTime = song.querySelector('.audio').duration;
    const songMins = Math.trunc(songTime / 60);
    const songSecs = Math.trunc(songTime % 60);

    timeBox.querySelector('.whole-mins').innerHTML = songMins;
    timeBox.querySelector('.whole-secs').innerHTML = songSecs;

    song.querySelector('.play-icon').classList.remove('play-btn-loading');
  }

  //Event listeners

  playBtns.forEach(btn => {
    btn.classList.add('play-btn-loading');
    btn.addEventListener('click', function (e) {
      clickedSong = e.target.closest('.beat');

      if (clickedSong === currSong) {
        audio = currSong.querySelector('.audio');
        if (!clickedSong.classList.contains('play')) {
          playSong(clickedSong);
        } else {
          pauseSong(clickedSong);
        }
      }

      if (clickedSong !== currSong) {
        loadSong(currSong);
        pauseSong(currSong);
        currSong = clickedSong;
        audio = currSong.querySelector('.audio');
        playSong(currSong);
      }
    });
  });

  //Change song
  audios.forEach(audio => {
    audio.addEventListener('timeupdate', updateProgress);
  });

  audios.forEach(audio => {
    audio.addEventListener('ended', function (e) {
      refreshProgress();
      loadSong(e.target.closest('.beat'));
    });
  });

  progressContainers.forEach(progressContainer => {
    progressContainer.addEventListener('click', setProgress);
  });

  audios.forEach(audio => {
    if (audio.readyState >= 2) {
      renderTimes(audio.closest('.beat'));
    } else {
      audio.addEventListener('loadeddata', function (e) {
        renderTimes(e.target.closest('.beat'));
      });
    }
  });
}
//////////////////////////Beats////////////////////////////

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
