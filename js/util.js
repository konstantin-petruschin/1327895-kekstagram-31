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

const getErrorMessage = (message) => {
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

const sendErrorMessage = () => {
  const templateSendErrorAlert = document.querySelector('#error').content.querySelector('.error');
  const newAlert = templateSendErrorAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.error__button');
  const containerAlert = document.body.querySelector('.error__inner');
  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && (evt.target !== newAlert)) {
      newAlert.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== containerAlert) {
      newAlert.remove();
    }
  });
};


const sendMessage = () => {
  const templateSendAlert = document.querySelector('#success').content.querySelector('.success');
  const newAlert = templateSendAlert.cloneNode(true);
  document.body.appendChild(newAlert);
  const buttonAlert = document.body.querySelector('.success__button');
  const containerAlert = document.body.querySelector('.success__inner');
  buttonAlert.addEventListener('click', () => {
    newAlert.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && (evt.target !== newAlert)) {
      newAlert.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== containerAlert) {
      newAlert.remove();
    }
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';
export {getRandomArrayElement, getRandomNumber, createId, isEscapeKey, getErrorMessage, sendErrorMessage, sendMessage};
