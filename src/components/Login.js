
import React from 'react';
import AuthForm from './AuthForm';

function Login(props) {

  return (
    <AuthForm
        title="Вход"
        btnName="Вход"
        buttonText={props.buttonText}
        isLoggedIn={props.isLoggedIn}
        onSubmit={props.handleLogin}
        isLoginPage={true}
        handleHeaderBtn={props.handleHeaderBtn} >
          <p className={`auth-form__error-text ${props.isOpen ? 'auth-form__error-text_active' : "" }`}>Неудачная попытка входа</p>
      </AuthForm>
  )
}

export default Login;