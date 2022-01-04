import React, {MouseEvent, useState} from 'react';
import {SortByOrder, SortType, SortByType} from '../../../const/const';
import _ from 'lodash';

type SortProps = {
  onStateSortChange: (sort: string | undefined) => void;
  onStateOrderChange: (order: string | undefined) => void;
  viewState: {[p: string]: string};
  changeURL: (updatedViewState: {[p: string]: string}) => void;
}

const ACTIVE = -1;
const NOT_ACTIVE = 0;

const getSort = (sort:string):string => SortByType.get(sort) as string;
const getOrder = (order:string): string => SortByOrder.get(order) as string;

function Sort({onStateSortChange, onStateOrderChange, viewState, changeURL}:SortProps):JSX.Element {
  const [currentSortType, setCurrentSortType] = useState('');
  const [currentSortOrder, setCurrentSortOrder] = useState('');

  const handleSortClick = (sort: string) => {
    currentSortOrder.length === 0
      ? changeURL({...viewState, 'sort': getSort(sort), 'order': getOrder(SortType.Ascend)})
      : changeURL({...viewState, 'sort': getSort(sort)});
    onStateSortChange(getSort(sort));
    setCurrentSortType(sort);
    if (currentSortOrder.length === 0) {
      onStateOrderChange(getOrder(SortType.Ascend));
      setCurrentSortOrder(SortType.Ascend);
    }
    if (sort === currentSortType) {
      onStateSortChange('');
      setCurrentSortType('');
      const newViewState = _.omit(viewState, 'sort');
      changeURL(newViewState);
    }
  };

  const handleOrderClick = (order:string) => {
    currentSortType.length === 0
      ? changeURL({...viewState, 'order': getOrder(order),  'sort': getSort(SortType.Price)})
      : changeURL({...viewState, 'order': getOrder(order)});
    onStateOrderChange(SortByOrder.get(order));
    setCurrentSortOrder(order);
    if (currentSortType.length === 0) {
      onStateSortChange(getSort(SortType.Price));
      setCurrentSortType(SortType.Price);
    }
    if (order === currentSortOrder) {
      onStateOrderChange('');
      setCurrentSortOrder('');
      const newViewState = _.omit(viewState, 'order');
      changeURL(newViewState);
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${currentSortType === SortType.Price ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по цене"
          tabIndex={currentSortType === SortType.Price ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleSortClick(currentTarget.ariaLabel);
          }}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${currentSortType === SortType.Popularity ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по популярности"
          tabIndex={currentSortType === SortType.Popularity ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleSortClick(currentTarget.ariaLabel);
          }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${currentSortOrder === SortType.Ascend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={currentSortOrder === SortType.Ascend ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => {
            handleOrderClick(currentTarget.ariaLabel);
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${currentSortOrder === SortType.Descend ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={currentSortOrder === SortType.Descend ? ACTIVE : NOT_ACTIVE}
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
