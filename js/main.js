import {similarPhoto} from './data.js';
import {renderSimilarPhotoPostsArray} from './similar-posts.js';
import {showBigPicture} from './user-modal.js';
const similarPhotoPostsArray = similarPhoto();

renderSimilarPhotoPostsArray(similarPhotoPostsArray);
showBigPicture(similarPhotoPostsArray);
