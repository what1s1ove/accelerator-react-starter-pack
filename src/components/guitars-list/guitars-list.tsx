import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SortOrderOptions, SortTypeOptions } from '../../const';
import { Guitar } from '../../types/guitar';
import GuitarItem from '../guitar-item/guitar-item';
import { GuitarsListProps } from './types';

function GuitarsList({filteredGuitars}: GuitarsListProps): JSX.Element {
  const [sortType, setSortType] = useState<SortTypeOptions>(SortTypeOptions.Default);
  const [sortOrder, setSortOrder] = useState<SortOrderOptions>(SortOrderOptions.Default);
  if (sortType === SortTypeOptions.Popular) {
    filteredGuitars.sort((first: Guitar, second: Guitar) => first.rating - second.rating);
  }
  if (sortType === SortTypeOptions.Price) {
    filteredGuitars.sort((first: Guitar, second: Guitar) =>  first.price - second.price);
  }
  if (sortOrder === SortOrderOptions.Descending) {
    filteredGuitars.reverse();
  }
  if (sortType === SortTypeOptions.Default && sortOrder !== SortOrderOptions.Default) {
    setSortType(SortTypeOptions.Price);
  }

  return (
    <React.Fragment>
      <div className="catalog-sort">
        <h2 className="catalog-sort__title">Сортировать:</h2>
        <div className="catalog-sort__type">
          <button
            onClick={() => setSortType(SortTypeOptions.Price)}
            className={`catalog-sort__type-button
            ${sortType === SortTypeOptions.Price ? 'catalog-sort__type-button--active' : ''}`}
            aria-label="по цене" tabIndex={-1}
          >
            по цене
          </button>
          <button
            onClick={() => setSortType(SortTypeOptions.Popular)}
            className={`catalog-sort__type-button
            ${sortType === SortTypeOptions.Popular ? 'catalog-sort__type-button--active' : ''}`}
            aria-label="по популярности"
          >
            по популярности
          </button>
        </div>
        <div className="catalog-sort__order">
          <button
            onClick={() => setSortOrder(SortOrderOptions.Ascending)}
            className={`catalog-sort__order-button catalog-sort__order-button--up
            ${sortOrder === SortOrderOptions.Ascending ? 'catalog-sort__order-button--active' : ''}`}
            aria-label="По возрастанию" tabIndex={-1}
          >
          </button>
          <button
            onClick={() => setSortOrder(SortOrderOptions.Descending)}
            className={`catalog-sort__order-button catalog-sort__order-button--down
            ${sortOrder === SortOrderOptions.Descending ? 'catalog-sort__order-button--active' : ''}`}
            aria-label="По убыванию"
          >
          </button>
        </div>
      </div>
      <div className="cards catalog__cards">
        {
          filteredGuitars.map((guitar) => (
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
