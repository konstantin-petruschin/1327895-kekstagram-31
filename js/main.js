import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import {showBigPicture} from './user-modal.js';
import { getErrorMessage } from './util.js';
import { getData } from './api.js';
import { initUploadModal, setFormSubmit } from './form.js';
import { configFilter } from './filter.js';

const bootstrappApp = async () => {
  try {
    const photos = await getData();
    renderSimilarPhotoPostsArray(photos);
    configFilter(photos);
    showBigPicture(photos);
  } catch (error) {
    getErrorMessage(error.message);
  }
};

bootstrappApp();
setFormSubmit();
initUploadModal();
