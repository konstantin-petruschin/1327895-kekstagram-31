const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const listFragmentPhoto = document.createDocumentFragment();

const removeElements = (removedElements) => {
  const elementsToRemove = document.querySelectorAll(removedElements);
  elementsToRemove.forEach((element) => element.remove());
};

const renderSimilarPhotoPostsArray = (similarPhotoPostsArray) => {
  removeElements('.pictures .picture');

  similarPhotoPostsArray.forEach((photo) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.dataset.id = photo.id;
    listFragmentPhoto.appendChild(pictureElement);
  });

  picturesContainer.appendChild(listFragmentPhoto);
};

export { renderSimilarPhotoPostsArray };
