/* eslint-disable no-console */

import { useDispatch, useSelector } from 'react-redux';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductCard from '../product/product-card';
import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import { sortByPrice, sortByRating } from '../../utils/utils';
import CatalogFilter from '../catalog-filter/catalog-filter';
import { updateGuitars } from '../../store/actions';

function Main(): JSX.Element {

  const dispatch = useDispatch();

  // const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const sortedGuitars = useSelector<State, Guitar[]>((state) => state.sortedGuitars);

  const [isSortedByPrice, setSortedByPrice] = useState(false);
  const [isSortedByRaiting, setSortedByRaiting] = useState(false);
  const [isSortedFromHighToLow, setSortedFromHighToLow] = useState(false);
  const [isSortedFromLowToHigh, setSortedFromLowToHigh] = useState(false);

  useEffect(() => {
    if (isSortedByPrice) {
      dispatch(updateGuitars(sortByPrice([...sortedGuitars], isSortedFromHighToLow, isSortedFromLowToHigh)));
    }
    if (isSortedByRaiting) {
      dispatch(updateGuitars(sortByRating([...sortedGuitars], isSortedFromHighToLow, isSortedFromLowToHigh)));
    }

  }, [dispatch, isSortedByPrice, isSortedByRaiting, isSortedFromHighToLow, isSortedFromLowToHigh]);

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
            <CatalogFilter />
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={`catalog-sort__type-button  ${isSortedByPrice ? 'catalog-sort__type-button--active' : ''} `}
                  onClick={() => {
                    setSortedByRaiting(false); setSortedByPrice(true);
                  }}
                  aria-label="по цене"
                  tabIndex={-1}
                >по цене
                </button>
                <button
                  className={`catalog-sort__type-button  ${isSortedByRaiting ? 'catalog-sort__type-button--active' : ''} `}
                  aria-label="по популярности"
                  onClick={() => {
                    setSortedByPrice(false); setSortedByRaiting(true);
                  }}
                >по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortedFromHighToLow ? 'catalog-sort__order-button--active' : ''}`}
                  onClick={() => {
                    setSortedFromLowToHigh(false); setSortedFromHighToLow(true); isSortedByRaiting ? setSortedByPrice(false) : setSortedByPrice(true);
                  }}
                  aria-label="По возрастанию" tabIndex={-1}
                >
                </button>
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortedFromLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
                  aria-label="По убыванию"
                  tabIndex={-1}
                  onClick={() => {
                    setSortedFromHighToLow(false); setSortedFromLowToHigh(true); isSortedByRaiting ? setSortedByPrice(false) : setSortedByPrice(true);
                  }}
                >
                </button>
              </div>
            </div>
            <div className="cards catalog__cards">
              {
                sortedGuitars.map((guitar) => <ProductCard key={uniqid()} guitar={guitar} />)
              }

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
