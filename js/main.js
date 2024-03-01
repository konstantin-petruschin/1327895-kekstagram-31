const NAMES = [
  'Алексей',
  'Артем',
  'Борис',
  'Владимир',
  'Виктор',
  'Денис',
  'Егор',
  'Константин',
  'Кирилл',
  'Петр',
  'Роман',
  'Сергей',
  'Тимофей',
  'Иван',
  'Павел',
  'Александра',
  'Галина',
  'Евгения',
  'Екатерина',
  'Елена',
  'Полина',
  'Светлана',
  'Татьяна',
  'Олеся',
  'Юлия'
];

const DESCRIPTION = [
  'Пляж с выхоты птичьего полета',
  'Указатель дороги на пляж',
  'Каменистый берег лазурного моря',
  'Девушка в купальнике',
  'Две миски рисового супа',
  'Матово-черный суперкар McLaren P1',
  'Клубника в деревянной тарелке',
  'Напиток из ягод в стеклянных чашках',
  'Девушка на пляже, машущая пролетающему самолету',
  'Удобная подставка для обуви',
  'Песчанная дорожка, ведущая на пляж',
  'Белый ауди',
  'Блюдо из рыбы и овощей',
  'Кот, лежащий на рисе и перевязанный нури',
  'Футуристические ботинки',
  'Летящий над горами вдали самолет',
  'Выступление хора',
  'Раритетный автомобиль в страром гараже',
  'Тапочки с фонариками',
  'Двор гостинницы с пальмами',
  'Салат из курицы',
  'Морской закат',
  'Краб',
  'Рок-концерт, вид с зала на сцену',
  'Белый внедорожник, проезжающий мимо бегемотов'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_PHOTO_POST = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 30;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;

const createId = () => {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

const createIdPhoto = createId();
const createUrlPhoto = createId();
const descriptionIndex = createId();
const createIdUser = createId();

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.ceil(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(MIN_NUMBER_COMMENTS, elements.length - 1)];

const createUsers = () => ({
  id: createIdUser(),
  avatar: `img/avatar-${getRandomNumber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoPost = () => ({
  id: createIdPhoto(),
  url: `photos/${createUrlPhoto()}.jpg`,
  description:  DESCRIPTION[descriptionIndex() - 1], // не понимаю, что здесь делается
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments:  Array.from({length:getRandomNumber(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS)}, createUsers)
});

const similarPhoto = Array.from({length: SIMILAR_PHOTO_POST}, createPhotoPost);

console.log(similarPhoto);
