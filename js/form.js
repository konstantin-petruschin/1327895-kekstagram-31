import { isEscapeKey, sendMessage, sendErrorMessage } from './util.js';
import { sendData } from './api.js';

const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input'); // #upload-file .uploadFileControl
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //PhotoEditorForm
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel'); //photoEditorResetBtn
const submitButton = document.querySelector('.img-upload__submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

let errorMessage = '';

const openUserModal = () => {
  imageUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  imageUploadCancel.addEventListener('click', () => {
    imageUploadOverlay.classList.add('hidden');
    pageBody.classList.remove('modal-open');
  });
};

imageUploadInput.addEventListener ('change', openUserModal);

const onPhotoEditorResetButtonClick = () => closePhotoEditor() ;
const onDocunentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  imageUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocunentKeydown);
  imageUploadCancel.removeEventListener('click', onPhotoEditorResetButtonClick);
  imageUploadInput.value = '';
}

export const initUploadModal = () => {
  imageUploadInput.addEventListener('change', () =>{
    imageUploadOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    imageUploadCancel.addEventListener('cklick', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown' , onDocunentKeydown);
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    pristine.reset();
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};

const checkLengthComment = (value) => value.length <= MAX_LENGTH_COMMENT;
errorMessage = `Длина комментари больше ${MAX_LENGTH_COMMENT} символов`;

pristine.addValidator(hashtagInput, isValidHashtags, error, 2, false);
pristine.addValidator(commentInput, checkLengthComment, errorMessage);

uploadForm.addEventListener('submit', onFormSubmit);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Функция отправки формы
const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(sendErrorMessage)
        .finally(() => {
          sendMessage();
          unblockSubmitButton();
        });
    }
  });
};

export { setFormSubmit };
