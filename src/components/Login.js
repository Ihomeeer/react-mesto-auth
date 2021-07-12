
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
      handleHeaderBtn={props.handleHeaderBtn}
    />
  )
}

export default Login;