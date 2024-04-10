const REMOVE_MESSAGE_TIMEOUT = 5000;

const getRandomNumber = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(Math.abs(minValue), Math.abs(maxValue)));
  const upper = Math.ceil(Math.max(Math.abs(minValue), Math.abs(maxValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


const createId = () => {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

const errorLoadDataTemplate = document.querySelector('#data-error').content;

const body = document.body;

export const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }

  body.append(errorArea);
  const errorLoadDataArea = body.querySelector('.data-error');


  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';
export {getRandomArrayElement, getRandomNumber, createId, isEscapeKey};
