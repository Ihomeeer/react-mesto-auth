import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';


function App() {

  // хук для модалки с изменением профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // хук для открытия модалки с добавлением карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // хук для открытия модалки со сменой аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // хук для открытия модалки с подтверждением удаления
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  // хук для модалки с зумом
  const [selectedCard, setSelectedCard] = React.useState({});
  // хук для модалки с подтверждением удаления карточки
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  // хук для проверки логина пользователя;
  const [loggedIn, setLoggedIn] = React.useState(false);
  // хук для данных пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    cohort: "",
    _id: ""
  });
  // хук для данных для отрисовки карточек
  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  // открытие модалки профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  // открытие модалки добавления карточки
  const handleEditPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  // открытие модалки аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  // открытие модалки с зумом
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  // открытие модалки с подтверждением удаления карточки
  const handleDeleteConfirmClick = (card) => {
    setSelectedCardDelete(card)
    setIsConfirmPopupOpen(true)
  }
  // закрытие всех модалок оптом
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setSelectedCardDelete({});
  }

  // функция для обновления данных пользователя
  function handleUpdateUser({name, about}) {
    api.sendUserInfo({name, about})
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }
  // функция для обновления аватара пользователя
  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // функция для добавления карточки и перерисовывания массива с новой карточкой
  function handleAddPlaceSubmit(data) {
    return api.sendNewCard(data)
    .then ((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {console.log(err)
    })
  }
  // установка лайков/дизлайков для карточек
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(isLiked, card._id)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {console.log(err)
    })
  }
  // подтверждение удаления карточки
  function handleConfirmSubmit() {
    return api.deleteCard(selectedCardDelete)
    .then (() => {
      setCards(cards => cards.filter(card => card._id !== selectedCardDelete));
      closeAllPopups();
    })
    .catch((err) => {console.log(err)
    })
  }







  //Регистрация нового пользователя
  const handleRegister = (pasword, email) => {
    auth.register(pasword, email)
    .then(() => {
      history.push('/sign-in')
    })
    .catch((err) => {console.log(err)
    })

  }


  //Логин нового пользователя
  const handleLogin = (pasword, email) => {
    auth.authorization(pasword, email)
    .then((responce) => {
      console.log(responce)
      if(responce.token) {
        localStorage.setItem('token', responce.token);
        console.log("111111111111111111111")
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch((err) => {console.log(err)
    })
  }

  //проверка наличия и подлинности токена пользователя
  const checkToken = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
    }
  }

  //Логика кнопки в шапке
  const headerBtnSignIn = () => {
    history.push('/sign-up')
  }

  const headerBtnSignUp = () => {
    history.push('/sign-in')
  }


  // получение информации о пользователе и массива карточек при отрисовке страницы
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getDefaultCards()])
    .then(([userInfo, defaultCards]) => {
      setCurrentUser(userInfo);
      setCards(defaultCards);
    })
    .catch(error => console.log(error));
  }, [])


  // Проверка авторизации при отрисовке старницы
  React.useEffect(() => {
    checkToken();
  })


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>

        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleEditPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteConfirmClick}
            onCardClick={handleCardClick}
          />

          <Route exact path="/sign-up">
            <Register
              handleHeaderBtn={headerBtnSignUp}
              handleRegister={handleRegister}
              isLoggedIn={loggedIn}
            />
          </Route>

          <Route exact path="/sign-in">
            <Login
              handleHeaderBtn={headerBtnSignIn}
              handleLogin={handleLogin}
              isLoggedIn={loggedIn}
            />
          </Route>

          <Route path="*">
              <Redirect to="/" />
          </Route>
        </Switch>

        {/* Модалка с увеличенным изображением карточки */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        {/* Модалка для смены аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Модалка с редактированием профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Модалка с добавлением новой карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        {/* Модалка с подтверждением удаления карточки */}
        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleConfirmSubmit}
        />

        {/* Модалка с информированием об успешной или неуспешной регистрации */}
        <InfoTooltip
          isSucces = "true"
          isOpen = "true"
        />

        <Footer />

      </CurrentUserContext.Provider>


    </div>
  );
}

export default App;