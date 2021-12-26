import React, {MouseEvent, useState} from 'react';
import {SortType, TypeOfSort, OrderOfSort} from '../../../const/const';
import {useDispatch} from 'react-redux';
import {sortGuitarsListAction} from '../../../store/api-actions';

const ACTIVE = -1;
const NOT_ACTIVE = 0;

function Sort():JSX.Element {
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const dispatch = useDispatch();

  const handleBtnClick = (sort: string):void => {
    if (sort === SortType.Price || sort === SortType.Popularity) {
      setSortType(sort);
    } else {
      setSortOrder(sort);
    }
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
            handleBtnClick(currentTarget.ariaLabel);
            dispatch(sortGuitarsListAction(TypeOfSort.get(currentTarget.ariaLabel), OrderOfSort.get(sortOrder)));
          }}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${sortType === SortType.Popularity ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по популярности"
          tabIndex={sortType === SortType.Popularity ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleBtnClick(currentTarget.ariaLabel);
            dispatch(sortGuitarsListAction(TypeOfSort.get(currentTarget.ariaLabel), OrderOfSort.get(sortOrder)));
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
            handleBtnClick(currentTarget.ariaLabel);
            dispatch(sortGuitarsListAction(TypeOfSort.get(sortType), OrderOfSort.get(currentTarget.ariaLabel)));
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortOrder === SortType.Descend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={sortOrder === SortType.Descend ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleBtnClick(currentTarget.ariaLabel);
            dispatch(sortGuitarsListAction(TypeOfSort.get(sortType), OrderOfSort.get(currentTarget.ariaLabel)));
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
