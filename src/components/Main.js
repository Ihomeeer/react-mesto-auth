// Функциональный компонент, отвечающий за рендер блока с профилем

import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

  // контекст для данных пользователя
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <div className="profile__avatar-overlay">
              <button className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
            </div>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/>
          </div>
          <div className="profile__text-section">
            <div className="profile__name-section">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__function">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {props.cards.map(card => {
            return (
              <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;