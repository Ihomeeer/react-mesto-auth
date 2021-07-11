// Функциональный компонент, отвечающий за рендер карточек с данными, получаемыми с сервера
import CurrentUserContext from '../contexts/CurrentUserContext';

import React from 'react';
function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'elements__delete' : 'elements__delete_invisible'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ''}`
  );

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLike = () => {
    onCardLike(card);
  }

  const handleDelete = () => {
    onCardDelete(card._id);
  }

  return (
    <li key={card._id} className="elements__card">
    <button type="button" className={cardDeleteButtonClassName} onClick={handleDelete}></button>
    <img src={card.link} alt={card.name} className="elements__photo" onClick={handleClick} />
    <div className="elements__info-panel">
      <h2 className="elements__name" id="cardName">{card.name}</h2>
      <div className="elements__like-container">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
        <p className="elements__like-counter">{card.likes.length}</p>
      </div>
    </div>
  </li>
  )
}

export default Card;