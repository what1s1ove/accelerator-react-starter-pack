import { SyntheticEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SortOrder, SortType } from '../../const';
import { fetchSortedGuitarsAction } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSortChange(filterParams: string, sortType: string, sortOrder?: string) {
    if (!sortOrder) {
      sortOrder = '';
    }
    dispatch(fetchSortedGuitarsAction(filterParams, sortType, sortOrder));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogSort(props: PropsFromRedux): JSX.Element {
  const {onSortChange} = props;
  const [sortType, setSortType] = useState<string>(SortType.Price);
  const [sortOrder, setSortOrder] = useState<string>();
  const filterParams = String(useLocation<string>().search);

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
            setSortType(SortType.Price);
            handleSortTypeChange(event);
            onSortChange(filterParams, SortType.Price, sortOrder);
          }}
        >
          по цене
        </button>
        <button className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            setSortType(SortType.Rating);
            handleSortTypeChange(event);
            onSortChange(filterParams, SortType.Rating, sortOrder);
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
            setSortOrder(SortOrder.Asc);
            handleSortOrderChange(event);
            onSortChange(filterParams, sortType, SortOrder.Asc);
          }}
        />
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            setSortOrder(SortOrder.Desc);
            handleSortOrderChange(event);
            onSortChange(filterParams, sortType, SortOrder.Desc);
          }}
        />
      </div>
    </div>
  );
}

export {CatalogSort};
export default connector(CatalogSort);
