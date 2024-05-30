import { isEscapeKey } from './util.js';
import { renderComments, clearComments } from './render-comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const allPictureElement = document.querySelector('.pictures');
const userPictureCloseElement = document.querySelector('.big-picture__cancel');

const handleEscapeKeyPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKeyPress);
  }
};

const showBigPicture = (photoPosts) => {
  allPictureElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const photo = photoPosts.find((item) => item.id === parseInt(evt.target.closest('.picture').dataset.id, 10));

      clearComments();
      renderComments(photo.comments);

      bigPictureElement.classList.remove('hidden');
      bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
      bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
      bigPictureElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = photo.description;

      document.body.classList.add('modal-open');

      document.addEventListener('keydown', handleEscapeKeyPress);
    }
  });
};

userPictureCloseElement.addEventListener('click', () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKeyPress);
});

export { showBigPicture };
