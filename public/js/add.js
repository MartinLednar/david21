'use strict';

//Add components
const customPassword = document.querySelector('.add-password');
const customMail = document.querySelector('.add-mail');
const customCheckbox = document.querySelector('.add-check');
const customInputs = document.querySelector('.custom-inputs-box');
const passwordBtn = document.querySelector('.btn-custom');
const passwordInput = document.querySelector('.add-password');
const descriptionInput = document.querySelector('#add-description');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz';
//Add components

//Generating password//
const generatePassword = function () {
  let generatedPassword = '';
  for (let i = 0; i < 5; i++) {
    generatedPassword += chars[Math.trunc(Math.random() * chars.length)];
  }
  return generatedPassword;
};

passwordBtn.addEventListener('click', function () {
  passwordInput.value = ' ';
  passwordInput.value = generatePassword();
});

//Generating password

//Showing custom inputs//

customCheckbox.addEventListener('change', function () {
  if (this.checked) {
    customInputs.classList.remove('unchecked');
    customPassword.setAttribute('required', 'true');
    customMail.setAttribute('required', 'true');
    customPassword.removeAttribute('disabled', 'true');
    customMail.removeAttribute('disabled', 'true');

    //Description
    descriptionInput.classList.add('unchecked');
  } else {
    customInputs.classList.add('unchecked');
    customPassword.setAttribute('disabled', 'true');
    customMail.setAttribute('disabled', 'true');

    //Description
    descriptionInput.classList.remove('unchecked');
  }
});

//Showing custom inputs

//Form contact file input//
const fileInput = document.querySelector('.add-file');
const errMessage = document.querySelector('.add-err-file');

fileInput.addEventListener('change', function () {
  const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2);

  if (fileSize > 5) {
    this.value = null;
    errMessage.classList.remove('hidden-overlay');
  } else {
    errMessage.classList.add('hidden-overlay');
  }
});
//Form contact file input//
