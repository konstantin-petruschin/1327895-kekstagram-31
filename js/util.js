const REMOVE_MESSAGE_TIMEOUT = 5000;
const DEBOUNCE_DELAY = 500;

const errorLoadDataTemplate = document.querySelector('#data-error').content;
const body = document.body;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getErrorMessage = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  body.append(errorArea);
  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const sendErrorMessage = () => {
  const templateSendErrorAlert = document.querySelector('#error').content.querySelector('.error');
  const newAlert = templateSendErrorAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.error__button');
  const containerAlert = document.body.querySelector('.error__inner');

  const handleButtonClick = () => {
    newAlert.remove();
    removeEventListeners();
  };
  buttonAlert.addEventListener('click', handleButtonClick);

  const keyDownHandler = (evt) => {
    if (isEscapeKey(evt) || (evt.target === newAlert)) {
      newAlert.remove();
      removeEventListeners();
    }
  };
  document.addEventListener('keydown', keyDownHandler);

  function removeEventListeners () {
    buttonAlert.removeEventListener('click', handleButtonClick);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('click', clickHandler);
  }

  function clickHandler (evt) {
    if (evt.target !== containerAlert) {
      newAlert.remove();
      removeEventListeners();
    }
  }
  document.addEventListener('click', clickHandler);
};

const sendMessage = () => {
  const templateSendAlert = document.querySelector('#success').content.querySelector('.success');
  const newAlert = templateSendAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.success__button');
  const containerAlert = document.body.querySelector('.success__inner');

  const handleButtonClick = () => {
    newAlert.remove();
    removeEventListeners();
  };
  buttonAlert.addEventListener('click', handleButtonClick);

  const clickHandler = (evt) => {
    if (evt.target !== containerAlert) {
      newAlert.remove();
      removeEventListeners();
    }
  };
  document.addEventListener('click', clickHandler);

  function removeEventListeners () {
    buttonAlert.removeEventListener('click', handleButtonClick);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('click', clickHandler);
  }

  function keyDownHandler (evt) {
    if (isEscapeKey(evt) || (evt.target === newAlert)) {
      newAlert.remove();
      removeEventListeners();
    }
  }
  document.addEventListener('keydown', keyDownHandler);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, getErrorMessage, sendErrorMessage, sendMessage, debounce};
