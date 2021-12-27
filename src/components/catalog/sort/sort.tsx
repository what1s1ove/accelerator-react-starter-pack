import React, {MouseEvent, useState} from 'react';
import {OrderOfSort, SortType, TypeOfSort} from '../../../const/const';

type SortProps = {
  onSortChange: (sort: string | undefined) => void;
  onOrderChange: (order: string | undefined) => void;
}

const ACTIVE = -1;
const NOT_ACTIVE = 0;

function Sort({onSortChange, onOrderChange}:SortProps):JSX.Element {
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSortClick = (sort: string) => {
    onSortChange(TypeOfSort.get(sort));
    setSortType(sort);
  };

  const handleOrderClick = (order:string) => {
    onOrderChange(OrderOfSort.get(order));
    setSortOrder(order);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${sortType === SortType.Price ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по цене"
          tabIndex={sortType === SortType.Price ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleSortClick(currentTarget.ariaLabel);
          }}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${sortType === SortType.Popularity ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по популярности"
          tabIndex={sortType === SortType.Popularity ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleSortClick(currentTarget.ariaLabel);
          }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sortOrder === SortType.Ascend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={sortOrder === SortType.Ascend ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleOrderClick(currentTarget.ariaLabel);
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortOrder === SortType.Descend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={sortOrder === SortType.Descend ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleOrderClick(currentTarget.ariaLabel);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
