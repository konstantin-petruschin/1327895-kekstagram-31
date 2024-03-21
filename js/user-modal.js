import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('big-picture');
const allPictureElement = document.querySelector('pictures');
const userPictureCloseElement = document.querySelector('.big-picture__cancel');

const showBigPicture = (arr) => {
  allPictureElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.big-picture')) {
      bigPictureElement.classList.remove('hidden');
      //   const pictureBigImg = bigPictureElement.querySelector('.big-picture__img img');
      //   pictureBigImg.src = photo.url;
      //   pictureBigImg.alt = photo.description;
      //   bigPictureElement.querySelector('.picture__likes').textContent = photo.likes;
      //   bigPictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    }
  });
};


// evt.target.closest('.big-picture') - с этого элемента получить дата-атрибут
// обратиться к массиву arr (и переименовать его) и в нем найти тот объект у которого такой же ай ди;
// у нас нет объекта фото достать из массива evt.target.closest('.big-picture')
userPictureCloseElement.addEventListener('click', () =>{
  bigPictureElement.classList.add('hidden');
});

document.addEventListener('keydown' ,(evt)=> {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
  }
});

export { showBigPicture };
