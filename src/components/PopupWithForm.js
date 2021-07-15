// Функциональный компонент, отвечающий за рендер всех модалок с формами

import React from 'react';


function PopupWithForm(props) {
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
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : "" }`}>
      <form  name={props.name} className="popup__main-form" onSubmit={props.onSubmit} >
        <button  onMouseDown={props.onClose} type="button" className="popup__close-button"></button>
        <h2 className="popup__header">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__save-button">{props.buttonName}</button>
      </form>
    </div>
  );

}

export default PopupWithForm;