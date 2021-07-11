// Тут модалка с подтверждением удаления карточки

import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete()
  }
  return (
    <PopupWithForm name="confirm" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName="Удалить"/>
  )
}

export default ConfirmDeletePopup;