import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import {showBigPicture} from './user-modal.js';
import './form.js';
import './slider.js';
import { getErrorMessage } from './util.js';
import { getData } from './api.js';
import { initUploadModal, setFormSubmit } from './form.js';

try {
  const photos = await getData();
  renderSimilarPhotoPostsArray(photos);
  showBigPicture(photos);
} catch (error) {
  getErrorMessage(error.message);
}

setFormSubmit();
initUploadModal();

