import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input'); //#upload-file
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel'); //#upload-cancel

const openUserModal = () => {
  imageUploadInput.addEventListener('change', () => {
    imageUploadOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    imageUploadInput.value = '';

    // Слушаем событие клика на кнопке "Отмена"
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

openUserModal();
