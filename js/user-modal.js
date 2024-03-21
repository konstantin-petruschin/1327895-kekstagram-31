import { isEscapeKey } from './util.js';
import {picturesContainer} from './similar-posts.js';
// import { similarPhotoPostsArray } from './main.js';
const userPictureElement = document.querySelector('.big-picture');
const userPictureCloseElement = document.querySelector('.big-picture__cancel');

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.big-picture')) {
    userPictureElement.classList.remove('hidden');
    similarPhotoPostsArray.forEach((photo, id) => {
      const pictureBigImg = userPictureElement.querySelector('.big-picture__img');
      pictureBigImg.src = photo.url;
      pictureBigImg.alt = photo.description;
      userPictureElement.querySelector('.picture__likes').textContent = photo.likes;
      userPictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      userPictureElement.dataset.id = id;
      userPictureElement.appendChild(userPictureElement);
    });
  }
});

userPictureCloseElement.addEventListener('click', () =>{
  userPictureElement.classList.add('hidden');
});

document.addEventListener('keydown' ,(evt)=> {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    userPictureElement.classList.add('hidden');
  }
});




// userPictureElement.classList.remove('hidden');

// userPictureElement.addEventListener('click', (evt) => {
//   if (evt.target.closest('.big-picture')) {
//     userPictureElement.classList.remove('hidden');
//     similarPhotoPostsArray.forEach((photo, id) => {const pictureBigImg = userPictureElement.querySelector('.big-picture__img');
//       pictureBigImg.src = photo.url;
//       pictureBigImg.alt = photo.description;
//       userPictureElement.querySelector('.picture__likes').textContent = photo.likes;
//       userPictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
//       userPictureElement.dataset.id = id;
//       userPictureElement.appendChild(userPictureElement);
//     });
//   }
// });

// userPictureCloseElement.addEventListener('click', () =>{
//   userPictureElement.classList.add('hidden');
// });

// document.addEventListener('keydown' ,(evt)=> {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     userPictureElement.classList.add('hidden');
//   }
// });

