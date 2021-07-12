// тут таблички с информацией про успешную или не очень успешную регистрацию
import React from 'react';
import successPicRoute from "../images/Auth_success.svg";
import failPicRoute from "../images/Auth_fail.svg";

function InfoTooltip(props) {

  React.useEffect(() => {
    const handleEscClosePopup = (e) => {
        if (e.code === "Escape") props.onClose();
    }
    if (props.isOpen) {
        document.addEventListener('keyup', handleEscClosePopup);
    }

    return () => {
        document.removeEventListener('keyup', handleEscClosePopup);
    }
  }, [props, props.isOpen]);

  return (
    <div className={`popup info-tooltip ${props.isOpen ? 'popup_opened' : "" }`}>
      <div className="info-tooltip__container">
      <button  onMouseDown={props.onClose} type="button" className="popup__close-button"></button>
        <img src={props.isSucces ? successPicRoute : failPicRoute} alt={props.isSucces ? "Успешная авторизация" : "Авторизация не произошла"} className="info-tooltip__picture"/>
        <p className="info-tooltip__text">{props.isSucces ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  )

}

export default InfoTooltip;