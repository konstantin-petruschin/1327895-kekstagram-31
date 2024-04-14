import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import {showBigPicture} from './user-modal.js';
import { getErrorMessage } from './util.js';
import { getData } from './api.js';
import { initUploadModal, setFormSubmit, onFileInputChange } from './form.js';
import { configFilter } from './filter.js';

async function bootstrappApp() {
  try {
    const photos = await getData();
    renderSimilarPhotoPostsArray(photos);
    showBigPicture(photos);
    configFilter(photos);
  } catch (error) {
    getErrorMessage(error.message);
  }
}


setFormSubmit();
initUploadModal();
bootstrappApp();
onFileInputChange();

