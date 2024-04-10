import {similarPhoto} from './data.js';
import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import {showBigPicture} from './user-modal.js';
const similarPhotoPostsArray = similarPhoto();
import './form.js';
import './slider.js';
import { showErrorMessage } from './util.js';

try {
  const photos = await getData();
  savePhotos(photos);
} catch (error) {
  showErrorMessage(error.message);
}


renderSimilarPhotoPostsArray(similarPhotoPostsArray);
showBigPicture(similarPhotoPostsArray);
