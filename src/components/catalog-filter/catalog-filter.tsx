import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { updateGuitars } from '../../store/actions';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import { getObjectFromQueryString, getQueryStringFromObject } from '../../utils/utils';

function CatalogFilter() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);

  const [filteredGuitars, setFilteredGuitars] = useState<Guitar[]>([]);
  const [guitarTypeFilters, setGuitarTypeFilters] = useState<string[]>([]);
  const [guitarStingCountFilter, setGuitarStringCountFilter] = useState<number[]>([]);
  const [guitarsPriceRangeFilter, setGuitarsPriceRangeFilter] = useState<number[]>([]);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const searchParams = Object.values(getObjectFromQueryString(location.search));
    if (searchParams[0] && getObjectFromQueryString(location.search).type) {
      setGuitarTypeFilters(searchParams[1].split(','));
      setGuitarStringCountFilter(searchParams[2].split(',').map(parseFloat));
      setGuitarsPriceRangeFilter(searchParams[3].split(',').map(parseFloat));
    }
    else {
      setFilteredGuitars(guitars);
      dispatch(updateGuitars(guitars));
      setGuitarsPriceRangeFilter([guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[0], guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[guitars.length - 1]]);
    }
  }, [dispatch, guitars]);

  useEffect(() => {
    if (guitarTypeFilters.length !== 0) {
      setGuitarStringCountFilter([...new Set(guitars.filter((guitar) => guitarTypeFilters.includes(guitar.type)).map((guitar) => guitar.stringCount))]);
      return setFilteredGuitars(guitars.filter((guitar) => {
        if (guitarTypeFilters.some((guitarFilter) => guitarFilter === guitar.type)) {
          return guitar;
        }
      }));
    }
    setFilteredGuitars(guitars);
  }, [guitarTypeFilters, guitars]);

  useEffect(() => {
    dispatch(updateGuitars(filteredGuitars));
  }, [dispatch, filteredGuitars]);

  useEffect(() => {
    dispatch(updateGuitars(filteredGuitars.filter((guitar) => guitar.price > guitarsPriceRangeFilter[0] && guitar.price < guitarsPriceRangeFilter[1])));
  }, [dispatch, filteredGuitars, guitarsPriceRangeFilter]);

  const onMinPriceKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (parseFloat(event.currentTarget.value) < guitarsPriceRangeFilter[0]) {
        return event.currentTarget.value = guitarsPriceRangeFilter[0].toString();
      }
      if (parseFloat(event.currentTarget.value) > guitarsPriceRangeFilter[1]) {
        return event.currentTarget.value = guitarsPriceRangeFilter[1].toString();
      }
      if (!minPrice) {
        return setGuitarsPriceRangeFilter([guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[0], guitarsPriceRangeFilter[1]]);
      }
      setGuitarsPriceRangeFilter([parseFloat(event.currentTarget.value), guitarsPriceRangeFilter[1]]);

    }
  };

  const onMaxPriceKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (parseFloat(event.currentTarget.value) > guitarsPriceRangeFilter[1]) {
        return event.currentTarget.value = guitarsPriceRangeFilter[1].toString();
      }
      if (parseFloat(event.currentTarget.value) < guitarsPriceRangeFilter[0]) {
        return event.currentTarget.value = guitarsPriceRangeFilter[0].toString();
      }
      if (!maxPrice) {
        return setGuitarsPriceRangeFilter([guitarsPriceRangeFilter[0], guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[guitars.length - 1]]);
      }
      setGuitarsPriceRangeFilter([guitarsPriceRangeFilter[0], parseFloat(event.currentTarget.value)]);

    }
  };

  useEffect(() => {
    const searchParams = getObjectFromQueryString(location.search);
    searchParams.type = guitarTypeFilters.join(',');
    searchParams.string = guitarStingCountFilter.join(',');
    searchParams.price = guitarsPriceRangeFilter.join(',');
    history.replace({
      pathname: '/',
      search: getQueryStringFromObject(searchParams),
    });

  }, [guitarStingCountFilter, guitarTypeFilters, guitarsPriceRangeFilter, history, location.search]);

  const onGuitarTypeChange = (event: FormEvent<HTMLInputElement>, type: string) => {
    if (event.currentTarget.checked) {
      return setGuitarTypeFilters([...guitarTypeFilters, type]);
    }
    setGuitarTypeFilters(guitarTypeFilters.filter((filter) => filter !== type));

  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="text"
              placeholder={guitarsPriceRangeFilter[0] !== undefined ? guitarsPriceRangeFilter[0].toString() : '0'}
              id="priceMin"
              name="от"
              onKeyDown={onMinPriceKeyDown}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              defaultValue={guitarsPriceRangeFilter[0]}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={guitarsPriceRangeFilter[1] !== undefined ? guitarsPriceRangeFilter[1].toString() : '0'}
              id="priceMax"
              name="до"
              onKeyDown={onMaxPriceKeyDown}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}

            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item" >
          <input className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={(evt) => onGuitarTypeChange(evt, 'acoustic')}
            checked={guitarTypeFilters.includes('acoustic')}

          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={(evt) => onGuitarTypeChange(evt, 'electric')}
            checked={guitarTypeFilters.includes('electric')}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={(evt) => onGuitarTypeChange(evt, 'ukulele')}
            checked={guitarTypeFilters.includes('ukulele')}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox"
            id="4-strings"
            name="4-strings"
            disabled={!guitarStingCountFilter.includes(4)}
            onChange={(evt) => {
              evt.currentTarget.checked ?
                dispatch(updateGuitars((filteredGuitars.filter((guitar) => guitar.stringCount === 4)))) :

                dispatch(updateGuitars((filteredGuitars)));
            }}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            disabled={!guitarStingCountFilter.includes(6)}
            onChange={(evt) => {
              evt.currentTarget.checked ?
                dispatch(updateGuitars((filteredGuitars.filter((guitar) => guitar.stringCount === 6)))) :

                dispatch(updateGuitars((filteredGuitars)));
            }}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            disabled={!guitarStingCountFilter.includes(7)}
            onChange={(evt) => {
              evt.currentTarget.checked ?
                dispatch(updateGuitars((filteredGuitars.filter((guitar) => guitar.stringCount === 7)))) :

                dispatch(updateGuitars((filteredGuitars)));
            }}

          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            disabled={!guitarStingCountFilter.includes(12)}
            onChange={(evt) => {
              evt.currentTarget.checked ?
                dispatch(updateGuitars((filteredGuitars.filter((guitar) => guitar.stringCount === 12)))) :

                dispatch(updateGuitars((filteredGuitars)));
            }}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
