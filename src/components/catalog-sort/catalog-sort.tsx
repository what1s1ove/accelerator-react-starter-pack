import React, {MouseEvent} from 'react';
import {Sorts} from '../../const';

type SortProps = {
  sorts: Sorts[],
  activeSort: Sorts,
  onChangeSortType: (sort: Sorts) => void,
}

function CatalogSort({sorts, activeSort, onChangeSortType}:SortProps):JSX.Element {
  const sortType = 'catalog-sort__type-button';
  const sortTypeActive = 'catalog-sort__type-button--active';
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {sorts.map((sort) => (
          <button className={[sortType, sort === activeSort ? sortTypeActive : ''].join(' ')} key={sort} aria-label={sort} onClick={(evt:MouseEvent<HTMLButtonElement>) => {evt.preventDefault(); onChangeSortType(sort);}}>{sort}</button>
        ))}
      </div>
      <div className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию"></button>
        <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
      </div>
    </div>
  );
}

export default CatalogSort;
