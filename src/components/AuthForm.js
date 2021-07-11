import React from 'react';
import Header from './Header';

function AuthForm(props) {

  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  })

  const handleUserDataChange = (e) => {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.onSubmit( userData.email, userData.password);
  }

  return (
    <>
      <Header buttonText={props.buttonText} handleHeaderBtn={props.handleHeaderBtn}/>
      <form  name="AuthForm" className="auth-form" onSubmit={handleFormSubmit} noValidate >
        <h2 className="auth-form__header">{props.title}</h2>
        <input type="email" name="email" id="authFormEmail" className="auth-form__input auth-form__input_type_email" placeholder="Email" value={userData.email} onChange={handleUserDataChange} minLength="2" maxLength="40" required />
        <input type="password" name="password" id="authFormPassword" className="auth-form__input auth-form__input_type_password" placeholder="Пароль" value={userData.password} onChange={handleUserDataChange} minLength="2" maxLength="40" required />
        <button type="submit" className="auth-form__save-button">{props.btnName}</button>
        {props.children}
      </form>
    </>
  )

}

export default AuthForm;