export const BASE_URL = 'https://auth.nomoreparties.co';

//Запрос для регистрации пользователя
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return checkStatus(response);
  })
}

//Запрос для авторизации пользователя
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then((response) => {
    return checkStatus(response);
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
    }
  })
  .then((response) => {
    return checkStatus(response);
  })
}

//проверка состояния промиса, чтобы не писать одно и то же сто тыщ раз
function checkStatus(res) {
  if (res.status === 200) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}