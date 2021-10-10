'use strict';

//////////////////////////Beats////////////////////////////
const musicContainers = document.querySelectorAll('.beat');
const playBtns = document.querySelectorAll('.play-icon');

const audios = document.querySelectorAll('.audio');
const progress = document.querySelector('.progress');
const progressContainers = document.querySelectorAll('.progress-container');

//Current song
let currSong = document.querySelector('.beat');
let audio = currSong.querySelector('.audio');
let clickedSong;

console.log(currSong, audio);

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
  const width = this.clientWidth;
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
    console.log(clickedSong);
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

//////////////////////////Beats////////////////////////////
