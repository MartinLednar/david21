const orderedBtns = document.querySelectorAll('.btn-ordered');
const formBox = document.querySelector('.ordered-form-wrapper');
const formX = document.querySelector('.ordered-x');
const passwordForm = document.querySelector('.ordered-form');
const idInput = document.querySelector('#idInput');

orderedBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const id = e.target.closest('.beat').dataset.id;
    idInput.setAttribute('value', id);

    formBox.classList.remove('ordered-form-hidden');
  });
});

formX.addEventListener('click', function (e) {
  if (formBox.classList.contains('ordered-form-hidden')) {
    formBox.classList.remove('ordered-form-hidden');
  } else {
    formBox.classList.add('ordered-form-hidden');
  }
});
