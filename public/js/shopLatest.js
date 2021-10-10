const songsBox = document.querySelector('.songs-box');
const beat = document.querySelector('.beat');
const beats = document.querySelectorAll('.beat');
const beatLast = beats[beats.length - 1];
const latestBtn = document.querySelector('.latest-btn');
const oldest = latestBtn.querySelector('.oldest');
const latest = latestBtn.querySelector('.latest');
const arr = latestBtn.querySelector('.latest-icon');

latestBtn.addEventListener('click', function () {
  if (oldest.classList.contains('btn-hidden')) {
    oldest.classList.remove('btn-hidden');
    latest.classList.add('btn-hidden');
    songsBox.style.flexDirection = 'column-reverse';
    beat.style.marginBottom = 'auto';
    beatLast.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  } else {
    oldest.classList.add('btn-hidden');
    latest.classList.remove('btn-hidden');
    songsBox.style.flexDirection = 'column';
    beat.style.marginBottom = '2rem';
  }
});
