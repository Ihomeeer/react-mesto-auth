import React from 'react';
import successPicRoute from "../images/Auth_success.svg";
import failPicRoute from "../images/Auth_fail.svg";

function InfoTooltip(props) {

  return (
    <div className={`popup popup_type_info-tooltip ${props.isOpen ? 'popup_opened' : "" }`}>
      <div className="popup_type_info-tooltip__container">
      <button  onMouseDown={props.onClose} type="button" className="popup__close-button"></button>
        <img src={props.isSucces ? successPicRoute : failPicRoute} alt={props.isSucces ? "Успешная авторизация" : "Авторизация не произошла"} className="popup_type_info-tooltip__picture"/>
        <p className="popup_type_info-tooltip__text">{props.isSucces ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  )

}

export default InfoTooltip;