// Функциональный компонент, отвечающий за рендер хедера

import headerLogoPath from '../images/header__logo.svg'

function Header(props) {

return (
    <header className="header">
      <img className="header__logo" src={headerLogoPath} alt="Логотип проекта" />
      <div className="header__info-panel">
        <p className="header__email">{props.email}</p>
        <button
          aria-label={props.buttonText}
          className="header__button"
          onClick={props.handleHeaderBtn}>
            {props.buttonText}
        </button>
      </div>
    </header>
    );
}

export default Header;