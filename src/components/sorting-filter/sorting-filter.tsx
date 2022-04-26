import { BaseSyntheticEvent } from 'react';
import cn from 'classnames';
import { SortingOrder, SortingType } from '../../constants/sorting';

export function SortingFilter(props: {
    handleSortingButtonClick: (evt: BaseSyntheticEvent) => void
    handleOrderButtonClick: (evt: BaseSyntheticEvent) => void
    isButtonUpActive: boolean
    isButtonDownActive: boolean
    isButtonSortingPrice: boolean
    isButtonSortingRating: boolean
}) {
  return (
    <div className='catalog-sort'>
      <h4 className='catalog-sort__title'>Сортировать:</h4>
      <div className='catalog-sort__type'>
        <button
          className={
            cn('catalog-sort__type-button',
              {
                'catalog-sort__type-button--active': props.isButtonSortingPrice,
              },
            )
          }
          aria-label="по цене"
          tabIndex={-1}
          data-sort={SortingType.Price}
          onClick={props.handleSortingButtonClick}
        >
          по цене
        </button>
        <button
          className={
            cn('catalog-sort__type-button',
              {
                'catalog-sort__type-button--active': props.isButtonSortingRating,
              },
            )
          }
          aria-label="по популярности"
          data-sort={SortingType.Rating}
          onClick={props.handleSortingButtonClick}
        >
          по популярности
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className={
            cn('catalog-sort__order-button catalog-sort__order-button--up',
              {
                'catalog-sort__order-button--active': props.isButtonUpActive,
              },
            )
          }
          aria-label="По возрастанию"
          data-order={SortingOrder.Asc}
          onClick={props.handleOrderButtonClick}
        />
        <button
          className={
            cn(
              'catalog-sort__order-button catalog-sort__order-button--down',
              {
                'catalog-sort__order-button--active': props.isButtonDownActive,
              },
            )
          }
          aria-label="По убыванию"
          data-order={SortingOrder.Desc}
          onClick={props.handleOrderButtonClick}
        />
      </div>
    </div>
  );
}
