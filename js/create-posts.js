import {similarPhoto} from './data.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const listFragmentPhoto = document.createDocumentFragment();

similarPhoto.forEach((photo) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  listFragmentPhoto.appendChild(pictureElement);
});

const createPosts = picturesContainer.appendChild(listFragmentPhoto);

export default {createPosts};
