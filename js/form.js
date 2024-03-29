import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const clearErrorMsg = () => {
  const existingError = hashtagInput.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
};

const showErrorMsg = (errorMsg) => {
  clearErrorMsg();

  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  errorElement.textContent = errorMsg;
  hashtagInput.parentNode.insertBefore(errorElement, hashtagInput.nextSibling);
};

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
  errorTextParent: 'img-upload__field-wrapper',
});

const hashtagRegex = /^#[a-zA-Z0-9]{1,19}( #[a-zA-Z0-9]{1,19})*$/;

pristine.addValidator(hashtagInput, (value) => {
  if (!hashtagRegex.test(value)) {
    showErrorMsg('Хештегы должны начинаться с символа #, состоять из букв и цифр, и иметь длину от 1 до 19 символов.');
    return false;
  }

  if (!/\s/.test(value)) {
    showErrorMsg('Разделите xештеги через пробел');
    return false;
  }

  const hashtags = value.trim().split(' ');
  if (hashtags.length > 5) {
    showErrorMsg('Укажите не больше пяти хештегов');
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (hashtags.length !== uniqueHashtags.size) {
    showErrorMsg('Один и тот же хештег не может быть использован дважды');
    return false;
  }

  clearErrorMsg();
  return true;
});

openUserModal();
