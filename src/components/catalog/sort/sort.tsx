import React, {MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import {changeSortByIncrease, changeSortByTypeAction} from '../../../store/action';
import {SortType} from '../../../const/const';

const ACTIVE = -1;
const NOT_ACTIVE = 0;

type SortProps = {
  currentSortByType: string;
  currentSortByIncrease: string;
};

function Sort(props: SortProps):JSX.Element {
  const {currentSortByType, currentSortByIncrease} = props;
  const dispatch = useDispatch();

  const handleBtnClick = (sortType:string) => {
    if (sortType === SortType.Price || sortType === SortType.Popularity) {
      dispatch(changeSortByTypeAction(sortType));
      if (currentSortByIncrease.length === 0) {
        dispatch(changeSortByIncrease(SortType.DownUp));
      }
    } else {
      dispatch(changeSortByIncrease(sortType));
      if (currentSortByType.length === 0) {
        dispatch(changeSortByTypeAction(SortType.Price));
      }
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${currentSortByType === SortType.Price ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по цене"
          tabIndex={currentSortByType === SortType.Price ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => handleBtnClick(currentTarget.ariaLabel)}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${currentSortByType === SortType.Popularity ? 'catalog-sort__type-button--active': ''}`}
          aria-label="по популярности"
          tabIndex={currentSortByType === SortType.Price ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => handleBtnClick(currentTarget.ariaLabel)}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${currentSortByIncrease === SortType.DownUp ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={currentSortByIncrease === SortType.UpDown ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => handleBtnClick(currentTarget.ariaLabel)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${currentSortByIncrease === SortType.UpDown ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={currentSortByIncrease === SortType.DownUp ? ACTIVE : NOT_ACTIVE}
          onClick={({currentTarget}:MouseEvent<HTMLButtonElement>) => handleBtnClick(currentTarget.ariaLabel)}
        >
        </button>
      </div>
    </div>
  );
}

export default React.memo(Sort, (prevProps, nextProps) => prevProps === nextProps);
