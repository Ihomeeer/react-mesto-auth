import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  // Хуки для изменения имени и описания
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {

    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName="Сохранить">
      <div className="popup__input-container">
        <input type="text" name="name" id="profilePopupName" className="popup__input popup__name" value={name} onChange={handleNameChange} placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__error-span" id="profilePopupName-error"></span>
      </div>
      <div className="popup__input-container">
        <input type="text" name="about" id="profilePopupJob" className="popup__input popup__function" value={description} onChange={handleDescriptionChange} placeholder="Призвание" minLength="2" maxLength="200" required />
        <span className="popup__error-span" id="profilePopupJob-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;