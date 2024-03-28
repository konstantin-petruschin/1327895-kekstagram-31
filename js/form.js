import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const openUserModal = () => {
  imageUploadInput.addEventListener('change', () => {
    imageUploadOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    imageUploadInput.value = '';

    imageUploadCancel.addEventListener('click', () => {
      imageUploadOverlay.classList.add('hidden');
      pageBody.classList.remove('modal-open');
    });
  });
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imageUploadOverlay.classList.add('hidden');
    pageBody.classList.remove('modal-open');
  }
});


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParrent: 'img-upload__field-wrapper',

});
pristine.addValidator(hashtagInput, (value) => {
  const hasNumber = /^#[a-zа-яё0-9]{1,19}$/i.test(value);
  return hasNumber;
});

openUserModal();
