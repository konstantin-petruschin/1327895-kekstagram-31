const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];
const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsList = bigPictureElement.querySelector('.social__comments');
const socialCommentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentLoadButton = bigPictureElement.querySelector('.comments-loader');
const countShownComments = bigPictureElement.querySelector('.social__comment-shown-count');

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const totalRenderedComments = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const newComment = socialCommentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(newComment);
  });

  socialCommentsList.appendChild(socialCommentsFragment);

  if (totalRenderedComments >= comments.length) {
    commentLoadButton.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
  countShownComments.textContent = totalRenderedComments;
};

const renderComments = (currentComments) => {
  comments = currentComments;

  renderNextComments();
  commentLoadButton.addEventListener('click', renderNextComments);
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsList.innerHTML = '';
  commentLoadButton.removeEventListener('click', renderNextComments);
  commentLoadButton.classList.remove('hidden');
};

export { renderComments, clearComments };
