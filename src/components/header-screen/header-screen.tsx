import React from 'react';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import FormSearch from '../form-search/form-serach';

function HeaderScreen(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo />
        <Navigation />
        <FormSearch />
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default HeaderScreen;
