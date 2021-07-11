export const BASE_URL = 'https://auth.nomoreparties.co';

//Запрос для регистрации пользователя
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    checkStatus(response);
  })
}


//Запрос для авторизации пользователя
export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    checkStatus(response);
  })
}

//Запрос для проверки валидности токена и получения email для вставки в шапку сайта
export const checkUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({token})
  })
  .then((response) => {
    checkStatus(response);
  })
}

//проверка состояния промиса, чтобы не писать одно и то же сто тыщ раз
function checkStatus(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}