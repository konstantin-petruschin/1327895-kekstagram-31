import {similarPhoto} from './data.js';
import {renderSimilarPhotoPostsArray} from './create-posts.js';

const similarPhotoPostsArray = similarPhoto();

renderSimilarPhotoPostsArray(similarPhotoPostsArray);

