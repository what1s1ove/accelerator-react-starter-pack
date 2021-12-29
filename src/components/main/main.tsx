
import { useSelector } from 'react-redux';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductCard from '../product/product-card';
import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import { sortByPrice, sortByRating } from '../../utils/utils';

function Main(): JSX.Element {

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);

  const [isAnyOfFiltrationOn, setAnyOfFiltration] = useState(false);
  const [isSortedByPrice, setSortedByPrice] = useState(false);
  const [isSortedByRaiting, setSortedByRaiting] = useState(false);
  const [isSortedFromHighToLow, setSortedFromHighToLow] = useState(false);
  const [isSortedFromLowToHigh, setSortedFromLowToHigh] = useState(false);
  const [sortedGuitars, setGuitars] = useState(guitars);


  useEffect(() => {
    if (isAnyOfFiltrationOn) {
      if (isSortedByPrice) {
        return setGuitars(sortByPrice([...guitars], isSortedFromHighToLow, isSortedFromLowToHigh));
      }
      if (isSortedByRaiting) {
        return setGuitars(sortByRating([...guitars], isSortedFromHighToLow, isSortedFromLowToHigh));
      }
      if (isSortedFromHighToLow) {
        return setGuitars(sortByPrice([...guitars], isSortedFromHighToLow, isSortedFromLowToHigh));
      }
      if (isSortedFromLowToHigh) {
        return setGuitars(sortByPrice([...guitars], isSortedFromHighToLow, isSortedFromLowToHigh));
      }
    }
  }, [guitars, isAnyOfFiltrationOn, isSortedByPrice, isSortedByRaiting, isSortedFromHighToLow, isSortedFromLowToHigh]);

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href='/'>Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={`catalog-sort__type-button  ${isSortedByPrice ? 'catalog-sort__type-button--active' : ''} `}
                  onClick={() => {
                    setSortedByRaiting(false); setSortedByPrice(true); setAnyOfFiltration(true);
                  }}
                  aria-label="по цене"
                  tabIndex={-1}
                >по цене
                </button>
                <button
                  className={`catalog-sort__type-button  ${isSortedByRaiting ? 'catalog-sort__type-button--active' : ''} `}
                  aria-label="по популярности"
                  onClick={() => {
                    setSortedByPrice(false); setSortedByRaiting(true); setAnyOfFiltration(true);
                  }}
                >по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortedFromHighToLow ? 'catalog-sort__order-button--active' : ''}`}
                  onClick={() => {
                    setSortedFromLowToHigh(false); setSortedFromHighToLow(true); setAnyOfFiltration(true);
                  }}
                  aria-label="По возрастанию" tabIndex={-1}
                >
                </button>
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortedFromLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
                  aria-label="По убыванию"
                  tabIndex={-1}
                  onClick={() => {
                    setSortedFromHighToLow(false); setSortedFromLowToHigh(true); setAnyOfFiltration(true);
                  }}
                >
                </button>
              </div>
            </div>
            <div className="cards catalog__cards">
              {sortedGuitars.length !== 0 ? sortedGuitars.map((guitar) => <ProductCard key={uniqid()} guitar={guitar} />) : guitars.map((guitar) => <ProductCard key={uniqid()} guitar={guitar} />)}
            </div>
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
