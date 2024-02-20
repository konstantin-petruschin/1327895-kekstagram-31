const checkLengthString = (string, maxLength) => string.length <= maxLength;

// Примеры использования функции
// console.log(checkLengthString('проверяемая строка', 20)); // true
// console.log(checkLengthString('проверяемая строка', 18)); // true
// console.log(checkLengthString('проверяемая строка', 10)); // false

function checkPalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }
  return newString === normalizeString;
}

// console.log(checkPalindrome('топот')); // true
// console.log(checkPalindrome('ДовОд')); // true
// console.log(checkPalindrome('Кекс')); // false
// console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true

function selectNumbers (string) {
  if (typeof string === 'number') {
    string = string.toString();
  }
  let getNumber = '';
  for(let i = 0; i < string.length; i++) {
    if(!Number.isNaN(parseInt(string[i], 10))) {
      getNumber += string[i];
    }
  }
  return getNumber ? parseInt(getNumber, 10) : NaN;
}

// console.log(selectNumbers(2023));
// console.log(selectNumbers(-1));
// console.log(selectNumbers(1.5));
// console.log(selectNumbers('2023 год'));
// console.log(selectNumbers('ECMAScript 2022'));
// console.log(selectNumbers('1 кефир, 0.5 батона'));
// console.log(selectNumbers('агент 007'));
// console.log(selectNumbers('а я томат'));

