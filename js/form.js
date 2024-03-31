import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const imageUploadInput = uploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const isFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const clearErrorMsg = () => {
  const existingError = hashtagInput.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
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
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    imageUploadOverlay.classList.add('hidden');
    pageBody.classList.remove('modal-open');
  }
});

  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  const checkLengthComment = () => commentInput.value.length <= 140;
  const errorMessage = `Длина комментария ${commentInput.value.length} больше 140 символов`;
  pristine.addValidator(commentInput, checkLengthComment, errorMessage);

  const hashtagRegex = /^#[a-zA-Z0-9]{1,19}( #[a-zA-Z0-9]{1,19})*$/;
  const checkValidHashtags = () => hashtagRegex.test(hashtagInput.value);
  const checkPresenceGaps = () => hashtagInput.value.replace(/\s{2,}/g, ' ');
  const hashtagsArray = hashtagInput.value.trim().toLowerCase().split(' ');
  const checkQuantityHashtags = () => hashtagsArray.length < 5;
  const checkHashtagDuplicate = () => new Set(hashtagsArray).size === hashtagsArray.length;

  if (hashtagInput.value) {
    pristine.addValidator(hashtagInput, checkValidHashtags, 'Хештеги должны начинаться с символа #, состоять из букв и цифр, и иметь длину от 1 до 19 символов');
    pristine.addValidator(hashtagInput, checkPresenceGaps, 'Разделите хештеги через пробел');
    pristine.addValidator(hashtagInput, checkQuantityHashtags, 'Укажите не больше пяти хештегов');
    pristine.addValidator(hashtagInput, checkHashtagDuplicate, 'Один и тот же хештег не может быть использован дважды');
  }

  const isValid = pristine.validate();

  // Define a function to handle the form submission event
const handleFormSubmission = (event) => {
  if (!isValid) {
    event.preventDefault();
  }
};

// Add event listener for form submission (assuming it's a 'submit' event)
uploadForm.addEventListener('submit', handleFormSubmission);



openUserModal();
