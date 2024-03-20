const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const listFragmentPhoto = document.createDocumentFragment();

const renderSimilarPhotoPostsArray = (similarPhotoPostsArray) => {
  similarPhotoPostsArray.forEach((photo, id) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.dataset.id = id;
    listFragmentPhoto.appendChild(pictureElement);
  });

  picturesContainer.appendChild(listFragmentPhoto);
};

export {renderSimilarPhotoPostsArray};
