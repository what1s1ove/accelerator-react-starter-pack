import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SortOrderOptions, SortTypeOptions } from '../../const';
import { fetchGuitarsAction } from '../../store/api-actions';
import { getGuitarsList, getSortOrder, getSortType } from '../../store/guitars/selectors';
import { Guitar } from '../../types/guitar';
import GuitarItem from '../guitar-item/guitar-item';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitarsList);
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);
  if (sortType === SortTypeOptions.Popular) {
    guitars.sort((first: Guitar, second: Guitar) => second.rating - first.rating);
  }
  if (sortType === SortTypeOptions.Price) {
    guitars.sort((first: Guitar, second: Guitar) => second.price - first.price);
  }
  if (sortOrder === SortOrderOptions.Descending) {
    guitars.reverse();
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitarsAction());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="catalog-sort">
        <h2 className="catalog-sort__title">Сортировать:</h2>
        <div className="catalog-sort__type">
          <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" tabIndex={-1}>по цене</button>
          <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
        </div>
        <div className="catalog-sort__order">
          <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1}></button>
          <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
        </div>
      </div>
      <div className="cards catalog__cards">
        {
          guitars.map((guitar) => (
            <GuitarItem guitar={guitar} key={guitar.id} />
          ))
        }
      </div>
      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          <li className="pagination__page pagination__page--active"><Link className="link pagination__page-link" to="1">1</Link>
          </li>
          <li className="pagination__page"><Link className="link pagination__page-link" to="2">2</Link>
          </li>
          <li className="pagination__page"><Link className="link pagination__page-link" to="3">3</Link>
          </li>
          <li className="pagination__page pagination__page--next" id="next"><Link className="link pagination__page-link" to="2">Далее</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default GuitarsList;
