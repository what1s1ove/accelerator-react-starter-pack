import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to="#">
          <img className="logo__img" width="70" height="70" src="/img/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link link--current" to="#">Каталог</Link>
            </li>
            <li><Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li><Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <img className="form-search__icon"
                src="/img/magnifier.svg"
                alt="Искать"
                width="14"
                height="15"
              />
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"/>
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
          </ul>
        </div>
        <Link className="header__cart-link" to="#" aria-label="Корзина">
          <img className="header__cart-icon"
            src="/img/basket.svg"
            alt="Корзина"
            width="14"
            height="14"
          />
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
