import React from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';


function Register(props) {

  return (
    <AuthForm
      title="Регистрация"
      btnName="Зарегистрироваться"
      isLoginPage={false}
      isLoggedIn={props.isLoggedIn}
      onSubmit={props.handleRegister}
      handleHeaderBtn={props.handleHeaderBtn}
    >
      <div className="auth-form__text-container">
        <p className="auth-form__already-register">Уже зарегистрированы?</p>
        <Link to="sign-in" className="auth-form__sign-in-link">Войти</Link>
      </div>
    </AuthForm>
  )
}

export default Register;