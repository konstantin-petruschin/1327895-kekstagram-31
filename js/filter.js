import { showBigPicture } from './user-modal.js';
import { debounce } from './util.js';
const MAX_PICTURES_COUNT = 10;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length
};

let currentFilter = 'filter-default';
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRender = debounce(showBigPicture);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(SORTFUNC.random()).slice(0, MAX_PICTURES_COUNT);
  }
  if(currentFilter === FILTER.discussed){
    filteredPictures = pictures.toSorted(SORTFUNC.discussed);
  }
  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('imf-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturesData;
}

export { configFilter };