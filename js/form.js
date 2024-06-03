import { isEscapeKey, sendMessage, sendErrorMessage } from './util.js';
import { sendData } from './api.js';
import { resetFilter } from './slider.js';

const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.jfif'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadPreviewEffects = document.querySelectorAll('.effects__preview');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

let errorMessage = '';

const onFileInputChange = () => {
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    const url = URL.createObjectURL(file);
    imgUploadPreview.src = url;
    uploadPreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }
};

const openUserModal = () => {
  imageUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  onFileInputChange();
  imageUploadCancel.addEventListener('click', () => {
    imageUploadOverlay.classList.add('hidden');
    pageBody.classList.remove('modal-open');
  });
};

imageUploadInput.addEventListener ('change', openUserModal);

const onPhotoEditorResetButtonClick = () => closePhotoEditor() ;
const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    const isSendingData = document.querySelector('.error');
    if(document.activeElement === hashtagInput || document.activeElement === commentInput || isSendingData) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

function closePhotoEditor () {
  imageUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadCancel.removeEventListener('click', onPhotoEditorResetButtonClick);
  imageUploadInput.value = '';
  pristine.reset();
  uploadForm.reset();
  imgUploadPreview.style.transform = '';
}

const initUploadModal = () => {
  imageUploadInput.addEventListener('change', () => {
    imageUploadOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    imageUploadCancel.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown' , onDocumentKeydown);
    resetFilter();
  });
};

const error = () => errorMessage;
const isValidHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const conditionsArray = [
    {
      check: inputArray.some((item) => !hashtagRegex.test(item)),
      error: 'Хештеги должны начинаться с символа #, состоять из букв и цифр, и иметь длину от 1 до 19 символов',
    },
    {
      check: inputArray.length > MAX_COUNT_HASHTAGS,
      error: 'Укажите не больше пяти хештегов',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Один и тот же хештег не может быть использован дважды',
    },

  ];

  return conditionsArray.every((itemCondition) => {
    const notValid = itemCondition.check;
    if (notValid) {
      errorMessage = itemCondition.error;
    }
    return !notValid;
  });
};

const checkLengthComment = (value) => value.length <= MAX_LENGTH_COMMENT;
errorMessage = `Длина комментари больше ${MAX_LENGTH_COMMENT} символов`;

pristine.addValidator(hashtagInput, isValidHashtags, error, 2, false);
pristine.addValidator(commentInput, checkLengthComment, errorMessage);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const setFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      pristine.reset();
      sendData(new FormData(evt.target))
        .then(() => {
          sendMessage();
          closePhotoEditor();
          resetFilter();
        })
        .catch(sendErrorMessage)
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

export { initUploadModal, setFormSubmit };
