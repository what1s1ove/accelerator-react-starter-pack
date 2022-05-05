import cn from 'classnames';
import { BaseSyntheticEvent, useCallback, useEffect, useMemo } from 'react';
import { H2 } from '../../components/h2/h2';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { PriceFilter } from '../../components/price-filter/price-filter';
import { GuitarTypeFilter } from '../../components/guitar-type-filter/guitar-type-filter';
import { StringFilter } from '../../components/string-filter/string-filter';
import { SortingFilter } from '../../components/sorting-filter/sorting-filter';
import { ProductItem } from '../../components/product-item/product-item';
import { Pagination } from '../../components/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredGuitars } from '../../store/guitars/selectors';
import { fetchFilteredGuitarsList } from '../../store/guitars/api-actions';
import { QueryParam } from '../../constants/query-param';
import { SortingOrder, SortingType } from '../../constants/sorting';
import styles from './catalog.module.css';
import { IGuitar } from '../../types/IGuitars';
import { getGuitarType, getPriceRange, getQuantityOfStrings, getSortingOrder, getSortingType } from '../../store/filters/selectors';
import {
  loadGuitarsPriceRange, loadGuitarType, loadQuantityOfStrings,
  loadSortingOrder, loadSortingType, removeGuitarType, removeQuantityOfStrings
} from '../../store/filters/slice';
import { getCurrentPage } from '../../store/pagination/selectors';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { loadCurrentPage } from '../../store/pagination/action';

const breadcrumbsItems = ['Главная', 'Каталог'];
type PageNumber = {page: string}

export function Catalog(props: {
    className?: string
}) {
  const dispatch = useDispatch();
  const guitars = useSelector(getFilteredGuitars);
  const sortingType = useSelector(getSortingType);
  const sortingOrder = useSelector(getSortingOrder);
  const quantityOfStrings = useSelector(getQuantityOfStrings);
  const guitarType = useSelector(getGuitarType);
  const guitarsPriceRange = useSelector(getPriceRange);
  const currentPage = useSelector(getCurrentPage);
  const {page} = useParams<PageNumber>();
  const {search, pathname} = useLocation();
  const history = useHistory();
  const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    dispatch(fetchFilteredGuitarsList({
      [QueryParam.Sort]: sortingType || SortingType.Price,
      [QueryParam.Order]: sortingOrder || SortingOrder.Asc,
    }));
  }, [dispatch, sortingType, sortingOrder, quantityOfStrings, guitarType, guitarsPriceRange, currentPage]);

  useEffect(() => {
    dispatch(loadCurrentPage(Number(page)));
  }, [dispatch, page]);

  useEffect(() => {
    urlSearchParams.delete(QueryParam.Type);
    guitarType.forEach((type) => urlSearchParams.append(QueryParam.Type, type));

    urlSearchParams.delete(QueryParam.StringCount);
    quantityOfStrings.forEach((stringCount) => urlSearchParams.append(QueryParam.StringCount, stringCount));

    if (guitarsPriceRange.min === 0) {
      urlSearchParams.delete(QueryParam.PriceGte);
    } else {
      guitarsPriceRange.min && urlSearchParams.set(QueryParam.PriceGte, guitarsPriceRange.min.toString());
    }

    if (guitarsPriceRange.max === 0) {
      urlSearchParams.delete(QueryParam.PriceLte);
    } else {
      guitarsPriceRange.max && urlSearchParams.set(QueryParam.PriceLte, guitarsPriceRange.max.toString());
    }

    history.push(`${pathname}?${urlSearchParams}`);
  }, [guitarsPriceRange, guitarType, quantityOfStrings, history, pathname, search, urlSearchParams]);

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

  const handleMinPriceChange = useCallback((evt: BaseSyntheticEvent) => {
    const value = evt.target.value;

    dispatch(loadGuitarsPriceRange({
      min: +value,
    }));
  }, [dispatch]);

  const handleMaxPriceChange = useCallback((evt: BaseSyntheticEvent) => {
    const value = evt.target.value;

    dispatch(loadGuitarsPriceRange({
      max: +value,
    }));
  }, [dispatch]);

  return (
    <main className={cn('page-content', props.className)}>
      <div className="container">
        <H2 title="Каталог гитар" />
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbsItems} />

        <div className={styles.catalog}>
          <form className={styles['catalog-filter']}>
            <H2 className={styles['catalog__filter']} title="Фильтр" />
            <PriceFilter handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange} />
            <GuitarTypeFilter onChange={handleGuitarTypeChange} />
            <StringFilter onChange={handleStringQuantityChange} />
          </form>

          <SortingFilter
            onSortingButtonClickHandler={handleSortingTypeButtonClick}
            onOrderButtonClickHandler={handleSortingOrderButtonClick}
            isButtonDownActive={sortingOrder === SortingOrder.Desc}
            isButtonUpActive={sortingOrder === SortingOrder.Asc}
            isButtonSortingPrice={sortingType === SortingType.Price}
            isButtonSortingRating={sortingType === SortingType.Rating}
          />

          <div className={cn(styles['catalog__cards'], styles['cards'])}>
            {
              guitars.length > 0 && guitars.map((guitar: IGuitar) => (
                <ProductItem
                  key={guitar.id}
                  name={guitar.name}
                  previewImg={`/${guitar.previewImg}`}
                  price={guitar.price}
                  rating={guitar.rating}
                  alt={guitar.name}
                  comments={guitar.comments}
                />))
            }
            {
              guitars.length === 0 && <div>No guitars found</div>
            }
          </div>

          <Pagination />
        </div>
      </div>
    </main>
  );
}
