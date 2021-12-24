import React from 'react';
import { Link } from 'react-router-dom';
function Catalog(): JSX.Element {
  return (
    <React.Fragment>
      <header className="header">
        <div className="header__logo">
          <Link className="header__logo-link" to="">
            <img
              className="header__logo-img" src="img/logo.svg"
              alt="Логотип Guitar Shop"
              width="70"
              height="70"
            />
          </Link>
        </div>
        <nav className="header__site-nav site-nav">
          <ul className="site-nav__list">
            <li className="site-nav__item">
              <Link className="site-nav__link" to="#">
                Каталог
              </Link>
            </li>
            <li className="site-nav__item">
              <Link className="site-nav__link" to="">
                Где купить?
              </Link>
            </li>
            <li className="site-nav__item">
              <Link className="site-nav__link" to="">
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="header__user-nav user-nav">
          <ul className="user-nav__list">
            <li className="user-nav__item">
              <form className="search-form">
                <label className="search-form__label visually-hidden" htmlFor="search">
                  Поиск по сайту
                </label>
                <input
                  className="search-form__field"
                  type="text"
                  name="search"
                  defaultValue=""
                  placeholder="Что вы ищете?"
                  id="search"
                />
                <button className="search-form__button" type="submit">
                  <span className="search-form__button-title visually-hidden">Искать</span>
                  <img
                    className="search-form__button-img"
                    src="img/magnifier.svg"
                    alt="Искать"
                    width="40"
                    height="40"
                  />
                </button>
              </form>
            </li>
            <li className="user-nav__item">
              <Link className="basket" to="">
                <img className="basket__img"
                  src="img/basket.svg"
                  alt="Корзина"
                  width="40"
                  height="40"
                />
                <span className="basket__count-goods">2</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="catalog">
        <h1 className="catalog__title">Каталог гитар</h1>
        <nav className="bread-crumbs">
          <ul className="bread-crumbs__list">
            <li className="bread-crumbs__item">
              <Link to="">Главная</Link>
            </li>
            <li className="bread-crumbs__item">
              <Link className="disabled" to="">Каталог</Link>
            </li>
          </ul>
        </nav>
        <section>
          <div className="filter">
            <h2 className="filter__title">Фильтр</h2>
            <form className="filter__form" action="#" method="get">
              <fieldset className="filter__range">
                <legend className="filter__range-legend">
                  Цена, Р
                </legend>
                <div className="filter__item">
                  <input className="filter__range-from"
                    type="text" name="search" defaultValue="1000"
                  />
                  <span>-</span>
                  <input className="filter__range-to"
                    type="text" name="search" defaultValue="3000"
                  />
                </div>
              </fieldset>
              <fieldset className="filter__type">
                <legend className="filter__type-legend">
                  Тип гитар
                </legend>
                <div className="filter__item">
                  <input className="visually-hidden filter__type-checkbox"
                    type="checkbox" name="acoustic" id="acoustic"
                  />
                  <label htmlFor="acoustic">Акустические гитары</label>
                  <input className="visually-hidden filter__type-checkbox"
                    type="checkbox" name="electric" id="electric"
                  />
                  <label htmlFor="electric">Электрогитары</label>
                  <input className="visually-hidden filter__type-checkbox"
                    type="checkbox" name="ukulele" id="ukulele"
                  />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
            </form>
          </div>
        </section>
      </main>
      <footer></footer>
    </React.Fragment>
  );
}

export default Catalog;
