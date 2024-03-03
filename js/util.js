import {MIN_NUMBER_COMMENTS} from './data';

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.ceil(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(MIN_NUMBER_COMMENTS, elements.length - 1)];


const createId = () => {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

export {getRandomArrayElement, getRandomNumber, createId};
