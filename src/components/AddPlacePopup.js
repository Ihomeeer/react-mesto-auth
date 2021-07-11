import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  //рефы для имени и линка карточки+
  const [nameInputValue, setNameInputValue ] = React.useState("");
  const [linkInputValue, setLinkInputValue ] = React.useState("");

  //создаем 2 функции для управляемых компонентов
  function handleNameChange(e) {
    setNameInputValue(e.target.value)
  }
  function handleLinkChange(e) {
    setLinkInputValue(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    //отправляем данные из инпутов
    props.onSubmit({
      name: nameInputValue,
      link: linkInputValue
    })

  }

  //очистка инпутов модалки после отправления данных на сервер
  React.useEffect(() => {
    setNameInputValue("")
    setLinkInputValue("")
  }, [props, props.isOpen])

  return (
    <PopupWithForm name="place" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName="Сохранить">
      <div className="popup__input-container">
          <input type="text" name="name" id="placePopupName" value={nameInputValue} onChange={handleNameChange} className="popup__input popup__name" placeholder="Название" minLength="2" maxLength="40" required />
          <span className="popup__error-span" id="placePopupName-error"></span>
        </div>
        <div className="popup__input-container">
          <input type="url" name="link" id="placePopupLink" value={linkInputValue} onChange={handleLinkChange} className="popup__input popup__function" placeholder="Ссылка на картинку" minLength="2" required />
          <span className="popup__error-span" id="placePopupLink-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;