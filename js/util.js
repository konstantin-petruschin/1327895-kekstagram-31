const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.ceil(Math.max(Math.abs(a), Math.abs(b)));
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

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effect__preview--none',
    'effect-chrome': 'effect__preview--chrome',
    'effect-sepia': 'effect__preview--sepia',
    'effect-marvin': 'effect__preview--marvin',
    'effect-phobos': 'effect__preview--phobos',
    'effect-heat': 'effect__preview--heat',
  };
  return selectors[currentInputId];
};

const isEscapeKey = (evt) => evt.key === 'Escape';
export {getRandomArrayElement, getRandomNumber, createId, getEffectSelector, isEscapeKey};
