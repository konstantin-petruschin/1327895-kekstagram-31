import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import {showBigPicture} from './user-modal.js';
import { getErrorMessage } from './util.js';
import { getData } from './api.js';
import { initUploadModal, setFormSubmit } from './form.js';

async function bootstrappApp() {
  try {
    const photos = await getData();
    renderSimilarPhotoPostsArray(photos);
    showBigPicture(photos);
  } catch (error) {
    getErrorMessage(error.message);
  }
}


setFormSubmit();
initUploadModal();
bootstrappApp();

