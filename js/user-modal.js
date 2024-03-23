import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const allPictureElement = document.querySelector('.pictures');
const userPictureCloseElement = document.querySelector('.big-picture__cancel');

const showBigPicture = (photoPosts) => {
  allPictureElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const photo = photoPosts[parseInt(evt.target.closest('.picture').dataset.id, 10)];

      bigPictureElement.classList.remove('hidden');
      bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
      bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
      bigPictureElement.querySelector('.social__comment-shown-count').textContent = photo.comments.length;
      bigPictureElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;

      const socialCommentsList = bigPictureElement.querySelector('.social__comments');
      bigPictureElement.querySelector('.social__caption').textContent = photo.description;
      socialCommentsList.innerHTML = '';

      const socialCommentTemplate = bigPictureElement.querySelector('.social__comment').cloneNode(true);
      const socialCommentsFragment = document.createDocumentFragment();

      photo.comments.forEach((comment) => {
        const newComment = socialCommentTemplate.cloneNode(true);
        newComment.querySelector('.social__picture').src = comment.avatar;
        newComment.querySelector('.social__picture').alt = comment.name;
        newComment.querySelector('.social__text').textContent = comment.message;
        socialCommentsFragment.appendChild(newComment);
      });

      socialCommentsList.appendChild(socialCommentsFragment);
      bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
      bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

      document.body.classList.add('modal-open');
    }
  });
};

userPictureCloseElement.addEventListener('click', () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export { showBigPicture };
