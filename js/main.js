import {SIMILAR_PHOTO_POST, createPhotoPost} from './data.js';

const similarPhoto = () => Array.from({length: SIMILAR_PHOTO_POST}, createPhotoPost);

console.log(similarPhoto());
