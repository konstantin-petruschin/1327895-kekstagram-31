const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data.';

const Route = {
  GET__DATA: '/data',
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
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, Method.GET, ErrorText.GET_DATA);

const sendData = (body) => load (Route.SEND_DATA, Method.POST, ErrorText.SEND_DATA, body);

export {getData, sendData};


