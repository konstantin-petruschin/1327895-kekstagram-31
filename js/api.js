const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз.',
  [Method.POST]: 'Не удалось отправить данные',
};

const load = (route, method = Method.GET, errorText, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(errorText ?? error.message);
    });

const getData = () => load(Route.GET_DATA, Method.GET, ErrorText.GET_DATA);

const sendData = (body) => load (Route.SEND_DATA, Method.POST, ErrorText.SEND_DATA, body);

export {getData, sendData};


