// Функциональный компонент, отвечающий за рендер хедера

import headerLogoPath from '../images/header__logo.svg'

function Header(props) {

return (
    <header className="header">
      <img className="header__logo" src={headerLogoPath} alt="Логотип проекта" />
      <div className="header__info-panel">
        <p className="header__email"></p>
        <button
          aria-label={props.isLoginPage ? "Регистрация" : "Войти"}
          className="header__button"
          onClick={props.handleHeaderBtn}>
            {props.isLoginPage ? "Регистрация" : "Войти"}
        </button>
      </div>
    </header>
    );
}

export default Header;