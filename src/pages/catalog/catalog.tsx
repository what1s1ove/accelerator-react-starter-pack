import cn from 'classnames';
import { BaseSyntheticEvent, useCallback, useEffect } from 'react';
import { H2 } from '../../components/h2/h2';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { PriceFilter } from '../../components/price-filter/price-filter';
import { GuitarTypeFilter } from '../../components/guitar-type-filter/guitar-type-filter';
import { StringFilter } from '../../components/string-filter/string-filter';
import { SortingFilter } from '../../components/sorting-filter/sorting-filter';
import { ProductItem } from '../../components/product-item/product-item';
import { Pagination } from '../../components/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getGuitars } from '../../store/guitars/selectors';
import { fetchFilteredGuitarsList } from '../../store/guitars/api-actions';
import { QueryParams } from '../../constants/query-params';
import { SortingOrder, SortingType } from '../../constants/sorting';
import styles from './catalog.module.css';
import { IGuitar } from '../../types/IGuitars';
import { getGuitarType, getQuantityOfStrings, getSortingOrder, getSortingType } from '../../store/filters/selectors';
import { loadGuitarType, loadQuantityOfStrings, loadSortingOrder, loadSortingType, removeGuitarType, removeQuantityOfStrings } from '../../store/filters/action';

const breadcrumbsItems = ['Главная', 'Каталог'];

export function Catalog(props: {
    className?: string
}) {
  const guitars = useSelector(getGuitars);
  const sortingType = useSelector(getSortingType);
  const sortingOrder = useSelector(getSortingOrder);
  const quantityOfStrings = useSelector(getQuantityOfStrings);
  const guitarType = useSelector(getGuitarType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilteredGuitarsList({
      [QueryParams.Sort]: sortingType || SortingType.Price,
      [QueryParams.Order]: sortingOrder || SortingOrder.Asc,
    }));
  }, [dispatch, sortingType, sortingOrder, quantityOfStrings, guitarType]);

  const handleSortingTypeButtonClick = useCallback((evt: BaseSyntheticEvent) => {
    dispatch(loadSortingType(evt.target.dataset.sort));
  }, [dispatch]);

  const handleSortingOrderButtonClick = useCallback((evt: BaseSyntheticEvent) => {
    dispatch(loadSortingOrder(evt.target.dataset.order));
  }, [dispatch]);

  const handleGuitarTypeChange = useCallback((evt: BaseSyntheticEvent) => {
    if (evt.target.checked) {
      dispatch(loadGuitarType(evt.target.dataset.type));
    } else {
      dispatch(removeGuitarType(evt.target.dataset.type));
    }
  }, [dispatch]);

  const handleStringQuantityChange = useCallback((evt: BaseSyntheticEvent) => {
    if (evt.target.checked) {
      dispatch(loadQuantityOfStrings(evt.target.dataset.strings));
    } else {
      dispatch(removeQuantityOfStrings(evt.target.dataset.strings));
    }
  }, [dispatch]);

  return (
    <main className={cn(styles.content, props.className)}>
      <div className={styles['content__container']}>
        <H2 title="Каталог гитар" />
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbsItems} />

        <div className={styles.catalog}>
          <form className={styles['catalog-filter']}>
            <H2 className={styles['catalog__filter']} title="Фильтр" />
            <PriceFilter />
            <GuitarTypeFilter onChange={handleGuitarTypeChange} />
            <StringFilter onChange={handleStringQuantityChange} />
          </form>

          <SortingFilter
            handleSortingButtonClick={handleSortingTypeButtonClick}
            handleOrderButtonClick={handleSortingOrderButtonClick}
            isButtonDownActive={sortingOrder === SortingOrder.Desc}
            isButtonUpActive={sortingOrder === SortingOrder.Asc}
            isButtonSortingPrice={sortingType === SortingType.Price}
            isButtonSortingRating={sortingType === SortingType.Rating}
          />

          <div className={cn(styles['catalog__cards'], styles['cards'])}>
            {
              guitars.length > 0 &&
              guitars.map((guitar: IGuitar) => (
                <ProductItem
                  key={guitar.id}
                  name={guitar.name}
                  previewImg={guitar.previewImg}
                  price={guitar.price}
                  rating={guitar.rating}
                />))
            }
          </div>

          <Pagination className={cn(styles['page-content__pagination'], styles['pagination'])} />
        </div>
      </div>
    </main>
  );
}
