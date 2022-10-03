import cn from 'classnames';
import { BaseSyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { H2 } from '../../components/h2/h2';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { PriceFilter } from '../../components/price-filter/price-filter';
import { GuitarTypeFilter } from '../../components/guitar-type-filter/guitar-type-filter';
import { StringFilter } from '../../components/string-filter/string-filter';
import { SortingFilter } from '../../components/sorting-filter/sorting-filter';
import { ProductItem } from '../../components/product-item/product-item';
import { Pagination } from '../../components/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredGuitars, getGuitarsForChosenStrings, getMinAndMaxGuitarsPrice, getStringsForChosenGuitars } from '../../store/guitars/selectors';
import { fetchGuitarsList } from '../../store/guitars/api-actions';
import {fetchFilteredGuitarsList} from '../../store/guitars/slice';
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
import { loadCurrentPage } from '../../store/pagination/slice';
import { Loader } from '../../components/loader/loader';
import { AppRoute } from '../../constants/app-route';

const breadcrumbsItems = [
  {title: 'Главная', link: AppRoute.Home},
  {title: 'Каталог', link: ''},
];
type PageNumber = {page: string}

export function Catalog(props: {
    className?: string
}) {
  const dispatch = useDispatch();
  const {data: guitars, loading} = useSelector(getFilteredGuitars);
  const sortingType = useSelector(getSortingType);
  const sortingOrder = useSelector(getSortingOrder);
  const quantityOfStrings = useSelector(getQuantityOfStrings);
  const guitarType = useSelector(getGuitarType);
  const guitarsPriceRange = useSelector(getPriceRange);
  const currentPage = useSelector(getCurrentPage);
  const guitarsPrice = useSelector(getMinAndMaxGuitarsPrice);
  const stringsForChosenGuitars = useSelector(getStringsForChosenGuitars);
  const guitarsForChosenStrings = useSelector(getGuitarsForChosenStrings);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const {page} = useParams<PageNumber>();
  const {search, pathname} = useLocation();
  const history = useHistory();
  const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    dispatch(fetchGuitarsList());
  }, [dispatch]);

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
      guitarsPriceRange.min && urlSearchParams.set(QueryParam.PriceGte, minPrice.toString());
    }

    if (guitarsPriceRange.max === 0) {
      urlSearchParams.delete(QueryParam.PriceLte);
    } else {
      guitarsPriceRange.max && urlSearchParams.set(QueryParam.PriceLte, maxPrice.toString());
    }

    history.push(`${pathname}?${urlSearchParams}`);
  }, [guitarsPriceRange, guitarType, quantityOfStrings, history, pathname, search, urlSearchParams, minPrice, maxPrice]);

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

    setMinPrice(value);

    dispatch(loadGuitarsPriceRange({
      min: +value,
    }));
  }, [dispatch]);

  const handleMinPriceBlur = useCallback((evt: BaseSyntheticEvent) => {
    let value = evt.target.value;

    if (value === '') {
      return;
    }

    if (Number(value) < guitarsPrice.min) {
      value = guitarsPrice.min;
    }

    if (Number(value) > guitarsPrice.max) {
      value = guitarsPrice.max;
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      value = maxPrice;
    }

    setMinPrice(value);
  }, [guitarsPrice.min, guitarsPrice.max, maxPrice, minPrice]);


  const handleMaxPriceChange = useCallback((evt: BaseSyntheticEvent) => {
    const value = evt.target.value;

    setMaxPrice(value);

    dispatch(loadGuitarsPriceRange({
      max: +value,
    }));
  }, [dispatch]);

  const handleMaxPriceBlur = useCallback((evt: BaseSyntheticEvent) => {
    let value = evt.target.value;

    if (value === '') {
      return;
    }

    if (Number(value) > guitarsPrice.max) {
      value = guitarsPrice.max;
    }

    if (Number(value) < guitarsPrice.min) {
      value = guitarsPrice.min;
    }

    if (minPrice && maxPrice && Number(maxPrice) < Number(minPrice)) {
      value = minPrice;
    }

    setMaxPrice(value);
  }, [guitarsPrice.max, guitarsPrice.min, minPrice, maxPrice]);

  return (
    <div className={cn('container', props.className)}>
      <H2 title="Каталог гитар" />
      <Breadcrumbs className="breadcrumbs" items={breadcrumbsItems} />

      <div className="catalog">
        <form className="catalog-filter">
          <H2 className="catalog__filter" title="Фильтр" />
          <PriceFilter
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
            handleMinPriceBlur={handleMinPriceBlur}
            handleMaxPriceBlur={handleMaxPriceBlur}
            minPrice={guitarsPrice.min}
            maxPrice={guitarsPrice.max}
            valueMinPrice={minPrice}
            valueMaxPrice={maxPrice}
          />
          <GuitarTypeFilter
            onChange={handleGuitarTypeChange}
            guitarsForChosenStrings={guitarsForChosenStrings}
          />
          <StringFilter
            onChange={handleStringQuantityChange}
            stringsForChosenGuitars={stringsForChosenGuitars}
          />
        </form>

        <SortingFilter
          onSortingButtonClickHandler={handleSortingTypeButtonClick}
          onOrderButtonClickHandler={handleSortingOrderButtonClick}
          isButtonDownActive={sortingOrder === SortingOrder.Desc}
          isButtonUpActive={sortingOrder === SortingOrder.Asc}
          isButtonSortingPrice={sortingType === SortingType.Price}
          isButtonSortingRating={sortingType === SortingType.Rating}
        />

        <div className={cn(
          {
            'catalog__cards cards': guitars.length > 0 && loading === 'idle',
            [styles['empty-catalog']]: loading === 'pending' || guitars.length === 0,
          },
        )}
        >
          {
            loading === 'idle' && guitars.map((guitar: IGuitar) => (
              <ProductItem
                key={guitar.id}
                id={guitar.id}
                name={guitar.name}
                previewImg={`/${guitar.previewImg}`}
                price={guitar.price}
                rating={guitar.rating}
                alt={guitar.name}
                comments={guitar.comments}
              />))
          }
          {
            loading === 'pending' && <Loader />
          }
          {
            guitars.length === 0 && loading !== 'pending' && <p> No guitars found</p>
          }
        </div>

        <Pagination />
      </div>
    </div>
  );
}
