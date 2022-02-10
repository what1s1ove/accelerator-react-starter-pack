import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';


function Header(): JSX.Element {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);

  const memorizedSearchSuggestions = useMemo(() => guitars.filter((guitar) => {
    if (searchTerm !== '') {
      if (guitar.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return guitar;
      }
    } return null;
  }).map((guitar) => (
    <li className="form-search__select-item" tabIndex={0} onClick={() => history.push(`/guitars/${guitar.id}`)} key={uniqid()}>{guitar.name}</li>
  )), [guitars, history, searchTerm]);

  return (
    <header className="header" id="header" onClick={() => setSearchTerm('')}>
      <div className="container header__wrapper"><a className="header__logo logo" href='/'><img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" /></a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href='/'>Каталог</a>
            </li>
            <li><a className="link main-nav__link" href='/'>Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href='/'>О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" onInput={(evt) => setSearchTerm(evt.currentTarget.value)} />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          {memorizedSearchSuggestions.length !== 0 ?
            <ul className="form-search__select-list" style={{ zIndex: 10 }}>
              {memorizedSearchSuggestions}
            </ul>
            : ''}
        </div>
        <a className="header__cart-link" href='/' aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
