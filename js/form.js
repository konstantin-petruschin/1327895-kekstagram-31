import { isEscapeKey } from './util.js';

const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const SCALE_STEP = 0.25;

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input'); // uploadFileControl
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //PhotoEditorForm
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel'); //photoEditorResetBtn

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const reduce = uploadForm.querySelector('.scale__control--smaller');
const increase = uploadForm.querySelector('.scale-control--bigger');
const imgUploadPreview = uploadForm.querySelector('.img-upload--preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectLevel= uploadForm.querySelector('.img-upload__effect-level');
const effectList = uploadForm.querySelector('.effect__list');

const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
// const

let errorMessage = '';
let scale = 1;

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

  if(!inputText.length === 0) {
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
    const isValid = itemCondition.check;
    if (isValid) {
      errorMessage = itemCondition.error;
    }
    return !isValid;
  });
};

const onHashtagInput = () => isValidHashtags(hashtagInput.value);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};


// const hashtagsArray = (value) => value.trim().toLowerCase().split(' ');

// const checkValidHashtags = (value) => hashtagRegex.test(value);
// const checkQuantityHashtags = (value) => hashtagsArray(value).length < 5;
// const checkHashtagDuplicate = () => new Set(hashtagsArray).size === hashtagsArray.length;
// checkValidHashtags();
// if (hashtagInput.value) {
//   pristine.addValidator(hashtagInput, checkValidHashtags, );
//   pristine.addValidator(hashtagInput, checkQuantityHashtags, 'Укажите не больше пяти хештегов');
//   pristine.addValidator(hashtagInput, checkHashtagDuplicate, );
// }


// document.addEventListener('keydown', (evt) => {
//   if (isEscapeKey(evt) && !isFieldFocused()) {
//     evt.preventDefault();
//     imageUploadOverlay.classList.add('hidden');
//     pageBody.classList.remove('modal-open');
//   }
// });

const checkLengthComment = () => commentInput.value.length <= MAX_LENGTH_COMMENT;
errorMessage = `Длина комментари больше ${MAX_LENGTH_COMMENT} символов`;

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


const onReduceClick = () => {
  if(scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPreview.computedStyleMap.tarnsform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onIncreaseClick = () => {
  if(scale < 1) {
    scale += SCALE_STEP;
    imgUploadPreview.computedStyleMap.tarnsform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

pristine.addValidator(hashtagInput, isValidHashtags, error, 2, false);
pristine.addValidator(commentInput, checkLengthComment, errorMessage);


hashtagInput.addEventListener('input', onHashtagInput);
uploadForm.addEventListener('submit', onFormSubmit);
reduce.addEventListener('change', onReduceClick);
increase.addEventListener('change', onIncreaseClick);

openUserModal();
