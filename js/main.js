import {similarPhoto} from './data.js';
import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import './user-modal.js';
const similarPhotoPostsArray = similarPhoto();

renderSimilarPhotoPostsArray(similarPhotoPostsArray);
