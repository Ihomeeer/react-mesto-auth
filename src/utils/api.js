import React from 'react';

//Класс содержит всю логику для работы с API
class Api extends React.Component {
  constructor({props, baseUrl, headers}) {
    super(props);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка состояния промиса, чтобы не писать одно и то же сто тыщ раз
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkStatus(res));
  }

  //обновление информации о пользователе с сервера
  sendUserInfo(userData) {
    return fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: userData.name,
        about: userData.about
      })
    })
    .then(res => this._checkStatus(res));
  }

  //получение списка карточек с сервера при старте страницы
  getDefaultCards = () => {
    return fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
      headers: this._headers
    })
    .then(res => this._checkStatus(res));
  }

  //отправка новой карточки на сервер
  sendNewCard(cardData) {
    return fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => this._checkStatus(res));
  }

  //удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/v1/cohort-24/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(res => this._checkStatus(res));
  }

  //запрос на добавление лайка на сервер или его удаление
  toggleLike(isLiked, id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${id}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
      })
    .then(res => this._checkStatus(res));
  }

  //запрос на обновление аватара
  setAvatar(userData) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: userData
      })
    })
    .then(res => this._checkStatus(res))
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: '5183e2a2-8586-4c29-b979-09c0ece03d78',
    'Content-Type': 'application/json'
  }
});

export default api;
