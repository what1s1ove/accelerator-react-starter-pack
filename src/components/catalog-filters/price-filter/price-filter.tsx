import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { updateFilter } from '../../../store/actions';
import { Guitar } from '../../../types/shop-types';
import { FilterState, State } from '../../../types/state';
import { getCurrentGuitarsMaxPrice, getCurrentGuitarsMinPrice, getGuitarsMaxPrice, getGuitarsMinPrice, getObjectFromQueryString, getQueryStringFromObject } from '../../../utils/utils';

function PriceFilter() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const filterState = useSelector<State, FilterState>((state) => state.filterState);
  const searchParams = getObjectFromQueryString(location.search);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);


  useEffect(() => {

    if (minPrice && maxPrice) {

      dispatch(updateFilter({ ...filterState, price: [minPrice, maxPrice] }));

    }

  }, [minPrice, maxPrice]);


  const onMinPriceKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const currentPrice = parseFloat(evt.currentTarget.value);
    const getGuitarsToFilterByPrice = () => {
      if (filterState.type.length !== 0) {
        return guitars.filter((guitar) => filterState.type.includes(guitar.type));

      }
      return guitars.filter((guitar) => ['acoustic', 'electric', 'ukulele'].includes(guitar.type));
    };
    if (currentPrice >= getGuitarsMinPrice(getGuitarsToFilterByPrice()) && getGuitarsMaxPrice(getGuitarsToFilterByPrice()) >= currentPrice) {
      const params = getObjectFromQueryString(location.search);
      if (maxPrice !== 0) {
        params.price = getQueryStringFromObject([currentPrice, maxPrice].join(','));
      } else {
        params.price = getQueryStringFromObject([currentPrice, getGuitarsMaxPrice(getGuitarsToFilterByPrice())].join(','));
        setMaxPrice(getGuitarsMaxPrice(getGuitarsToFilterByPrice()));
      }
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(params),
      });
      setMinPrice(currentPrice);

      if (currentPrice > maxPrice) {

        evt.currentTarget.value = maxPrice.toString();
      }

    } else {
      if (currentPrice > maxPrice) {

        evt.currentTarget.value = maxPrice.toString();
      }
      const params = getObjectFromQueryString(location.search);
      if (maxPrice !== 0) {
        params.price = getQueryStringFromObject([getGuitarsMinPrice(getGuitarsToFilterByPrice()), maxPrice].join(','));
      } else {
        params.price = getQueryStringFromObject([getGuitarsMinPrice(getGuitarsToFilterByPrice()), getGuitarsMaxPrice(getGuitarsToFilterByPrice())].join(','));
        setMaxPrice(getGuitarsMaxPrice(getGuitarsToFilterByPrice()));
      }
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(params),
      });
      setMinPrice(getGuitarsMinPrice(getGuitarsToFilterByPrice()));
    }
  };

  const onMaxPriceKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const currentPrice = parseFloat(evt.currentTarget.value);
    const getGuitarsToFilterByPrice = () => {
      if (filterState.type.length !== 0) {
        return guitars.filter((guitar) => filterState.type.includes(guitar.type));

      }
      return guitars.filter((guitar) => ['acoustic', 'electric', 'ukulele'].includes(guitar.type));
    };
    if (currentPrice >= getGuitarsMinPrice(getGuitarsToFilterByPrice()) && getGuitarsMaxPrice(getGuitarsToFilterByPrice()) >= currentPrice) {
      const params = getObjectFromQueryString(location.search);

      if (minPrice !== 0) {
        params.price = getQueryStringFromObject([minPrice, currentPrice].join(','));
      } else {
        params.price = getQueryStringFromObject([getGuitarsMinPrice(getGuitarsToFilterByPrice()), currentPrice].join(','));
        setMinPrice(getGuitarsMinPrice(getGuitarsToFilterByPrice()));
      }
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(params),
      });
      setMaxPrice(currentPrice);
      if (currentPrice < minPrice && currentPrice.toString().length >= minPrice.toString().length) {
        evt.currentTarget.value = minPrice.toString();
      }
    } else {


      const params = getObjectFromQueryString(location.search);
      if (minPrice !== 0) {
        params.price = getQueryStringFromObject([minPrice, getGuitarsMaxPrice(getGuitarsToFilterByPrice())].join(','));
      } else {
        params.price = getQueryStringFromObject([getGuitarsMinPrice(getGuitarsToFilterByPrice()), getGuitarsMaxPrice(getGuitarsToFilterByPrice())].join(','));
        setMinPrice(getGuitarsMinPrice(getGuitarsToFilterByPrice()));
      }
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(params),
      });
      setMaxPrice(getGuitarsMaxPrice(getGuitarsToFilterByPrice()));
    }

  };

  return (
    <div className="catalog-filter__price-range">
      <div className="form-input">
        <label className="visually-hidden">Минимальная цена</label>
        <input
          type="text"
          id="priceMin"
          name="от"
          onKeyUp={onMinPriceKeyDown}
          placeholder={guitars.length !== 0 ? getCurrentGuitarsMinPrice(guitars, filterState).toString() : undefined}
          defaultValue={searchParams.price ? searchParams.price.slice(0, -1).split('%2C').map(parseFloat)[0] : undefined}
        />
      </div>
      <div className="form-input">
        <label className="visually-hidden">Максимальная цена</label>
        <input
          type="number"
          id="priceMax"
          name="до"
          onKeyUp={onMaxPriceKeyDown}
          placeholder={guitars.length !== 0 ? getCurrentGuitarsMaxPrice(guitars, filterState).toString() : undefined}
          defaultValue={searchParams.price ? searchParams.price.slice(0, -1).split('%2C').map(parseFloat)[1] : undefined}
        />
      </div>
    </div>
  );
}

export default PriceFilter;
