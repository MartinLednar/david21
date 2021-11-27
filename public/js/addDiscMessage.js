const addMsgCheckbox = document.querySelector('#noMessage');
const addMsgInput = document.querySelector('.add-msg-input');

addMsgCheckbox.addEventListener('change', function () {
  if (addMsgInput.classList.contains('unchecked')) {
    addMsgInput.classList.remove('unchecked');
    addMsgInput.removeAttribute('disabled', 'true');
  } else {
    addMsgInput.classList.add('unchecked');
    addMsgInput.setAttribute('disabled', 'true');
  }
});
