// Отдельный функциональный компонент, отвечающий за рендер модалки с увеличенным изображением

import React from 'react';

function ImagePopup(props) {
  React.useEffect(() => {
    const handleEscClosePopup = (e) => {
      if (e.code === "Escape") props.onClose();
    }
    if (props.card) {
        document.addEventListener('keyup', handleEscClosePopup);
    }

    return () => {
        document.removeEventListener('keyup', handleEscClosePopup);
    }
  });

  return (
    <div className={`popup ${props.card.name ? 'popup_opened' : "" }`} name="popup_type_photo" id="photoPopup">
      <div className="popup__form-container">
        <button type="button" onMouseDown={props.onClose} className="popup__close-button popup__close-button_type_photo" id="photoPopupCloseBtn"></button>
        <figure className="popup__image-container">
          <img src={props.card.link} alt={props.card.name} className="popup__photo" />
          <figcaption className="popup__photo-name">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;