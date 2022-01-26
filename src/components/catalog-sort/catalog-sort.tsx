import { useHistory } from 'react-router-dom';
import {  AppRoute, SortOrder, QueryParams, SortType } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import React from 'react';

function CatalogSort(): JSX.Element {
  const history = useHistory();
  const querysParams = useQueryParams();

  const handleSortTypeClick = ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (currentTarget.dataset.sort) {
      case SortType.Price:
        querysParams.set(QueryParams.Sort, SortType.Price);
        break;
      case SortType.Rating:
        querysParams.set(QueryParams.Sort, SortType.Rating);
        break;
    }
    history.push(`${AppRoute.Query}${querysParams.toString()}`);
  };

  const handleSortOrderClick = ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (currentTarget.dataset.order) {
      case SortOrder.Asc:
        querysParams.set(QueryParams.Order, SortOrder.Asc);
        break;
      case SortOrder.Desc:
        querysParams.set(QueryParams.Order, SortOrder.Desc);
        break;
    }
    if (!querysParams.has(QueryParams.Sort)) {
      querysParams.set(QueryParams.Sort, SortType.Price);
    }
    history.push(`${AppRoute.Query}${querysParams.toString()}`);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {querysParams.get(QueryParams.Sort) === SortType.Price ?
          <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" tabIndex={-1} data-sort={SortType.Price} onClick={handleSortTypeClick}>по цене</button> :
          <button className="catalog-sort__type-button catalog-sort__type-button" aria-label="по цене" tabIndex={-1} data-sort={SortType.Price} onClick={handleSortTypeClick}>по цене</button>}
        {querysParams.get(QueryParams.Sort) === SortType.Rating ?
          <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по популярности" data-sort={SortType.Rating} onClick={handleSortTypeClick}>по популярности</button> :
          <button className="catalog-sort__type-button" aria-label="по популярности" data-sort={SortType.Rating} onClick={handleSortTypeClick}>по популярности</button>}
      </div>
      <div className="catalog-sort__order">
        {querysParams.get(QueryParams.Order) === SortOrder.Asc ?
          <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1} data-order={SortOrder.Asc} onClick={handleSortOrderClick}></button> :
          <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" tabIndex={-1} data-order={SortOrder.Asc} onClick={handleSortOrderClick}></button>}
        {querysParams.get(QueryParams.Order) === SortOrder.Desc ?
          <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию" data-order={SortOrder.Desc} onClick={handleSortOrderClick}></button> :
          <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию" data-order={SortOrder.Desc} onClick={handleSortOrderClick}></button>}
      </div>
    </div>
  );
}

export default CatalogSort;
