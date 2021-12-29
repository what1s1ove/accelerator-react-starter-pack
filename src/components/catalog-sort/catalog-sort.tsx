import { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FIRST_PAGE, SortOrder, SortType } from '../../const';
import { setSortOrder, setSortType } from '../../store/action';
import { fetchFilteredGuitarsAction } from '../../store/api-action';
import { getSortOrder, getSortType } from '../../store/selectors';

function CatalogSort(): JSX.Element {
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);
  const dispatch = useDispatch();

  const filterParams = String(useLocation<string>().search);

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterParams, sortType, sortOrder, FIRST_PAGE));
  }, [sortType, sortOrder, filterParams, dispatch]);

  const handleSortTypeChange = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    const sortTypeBtn = document.querySelectorAll('.catalog-sort__type-button');

    for (const button of sortTypeBtn) {
      button.classList.remove('catalog-sort__type-button--active');
    }

    target.classList.toggle('catalog-sort__type-button--active');
  };

  const handleSortOrderChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const sortOrderBtn = document.querySelectorAll('.catalog-sort__order-button');

    for (const button of sortOrderBtn) {
      button.classList.remove('catalog-sort__order-button--active');
    }

    target.classList.toggle('catalog-sort__order-button--active');
    if (sortType === SortType.Unknown) {
      dispatch(setSortType(SortType.Price));
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className="catalog-sort__type-button"
          aria-label="по цене"
          tabIndex={-1}
          onClick={(event) => {
            dispatch(setSortType(SortType.Price));
            handleSortTypeChange(event);
          }}
        >
          по цене
        </button>
        <button className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            dispatch(setSortType(SortType.Rating));
            handleSortTypeChange(event);
          }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className="catalog-sort__order-button catalog-sort__order-button--up"
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={(event) => {
            dispatch(setSortOrder(SortOrder.Asc));
            handleSortOrderChange(event);
          }}
        />
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            dispatch(setSortOrder(SortOrder.Desc));
            handleSortOrderChange(event);
          }}
        />
      </div>
    </div>
  );
}

export default CatalogSort;
