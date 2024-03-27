// 1. Загрузка нового изображения:
// выбор файла с изображением для загрузки;
// изменение масштаба изображения;
// применение одного из заранее заготовленных эффектов;
// выбор глубины эффекта с помощью ползунка;
// добавление текстового комментария;
// добавление хэштегов.

// выбор изображентя с пеомощью .img-upload__input
// после выбоа изображдения (измениния значения .img-upload__input), показывается форма редактирования изображения. У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open
//  Закрытие формы редактирования изображения производится либо нажатием на кнопку .img-upload__cancel, либо нажатием клавиши Esc. Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open.
import { isEscapeKey } from './util.js';
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const imageUploadInput = uploadForm.querySelector('.img-upload__input'); //#upload-file


const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel'); // #upload-cancel

const openUserModal = () => {
  imageUploadInput.addEventListener('change', () => {
    imageUploadOverlay.classList.add('hidden');
    pageBody.classList.add('modal-open');
    // imageUploadCancel.addEventListener
  });
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
openUserModal();
