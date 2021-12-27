import { SyntheticEvent, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FIRST_PAGE, SortOrder, SortType } from '../../const';
import { setSortOrder, setSortType } from '../../store/action';
import { fetchFilteredGuitarsAction } from '../../store/api-action';
import { RootState } from '../../store/root-reducer';
import { getSortOrder, getSortType } from '../../store/selectors';
import { ThunkAppDispatch } from '../../types/action';

const mapStateToProps = (state: RootState) => ({
  sortType: getSortType(state),
  sortOrder: getSortOrder(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSortTypeChange(sortType: SortType) {
    dispatch(setSortType(sortType));
  },
  onSortOrderChange(sortOrder: SortOrder) {
    dispatch(setSortOrder(sortOrder));
  },
  onSortChange(filterParams: string, sortType: string, sortOrder: string, pageNumber: number) {
    dispatch(fetchFilteredGuitarsAction(filterParams, sortType, sortOrder, pageNumber));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogSort(props: PropsFromRedux): JSX.Element {
  const {onSortTypeChange, onSortOrderChange: onOrderChange, onSortChange, sortType: sort, sortOrder: order} = props;

  const filterParams = String(useLocation<string>().search);

  useEffect(() => {
    onSortChange(filterParams, sort, order, FIRST_PAGE);
  }, [sort, order, onSortChange, filterParams]);

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
    if (sort === SortType.Unknown) {
      onSortTypeChange(SortType.Price);
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
            onSortTypeChange(SortType.Price);
            handleSortTypeChange(event);
          }}
        >
          по цене
        </button>
        <button className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            onSortTypeChange(SortType.Rating);
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
            onOrderChange(SortOrder.Asc);
            handleSortOrderChange(event);
          }}
        />
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            onOrderChange(SortOrder.Desc);
            handleSortOrderChange(event);
          }}
        />
      </div>
    </div>
  );
}

export {CatalogSort};
export default connector(CatalogSort);
