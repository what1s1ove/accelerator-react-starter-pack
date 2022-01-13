/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGuitars } from '../../store/actions';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';

function CatalogFilter() {


  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const sortedGuitars = useSelector<State, Guitar[]>((state) => state.sortedGuitars);


  const dispatch = useDispatch();

  const [filteredGuitars, setFilteredGuitars] = useState<Guitar[]>([]);
  const [guitarTypeFilters, setGuitarTypeFilters] = useState<string[]>([]);
  const [guitarStingCount, setGuitarStringCount] = useState<number[]>([]);
  const [guitarsPrice, setGuitarsPrice] = useState<number[]>([guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[0], sortedGuitars.map((guitar) => guitar.price).sort((a, b) => a - b)[sortedGuitars.length - 1]]);

  const [lowPrice, setLowPrice] = useState('');
  const [highPrice, setHighPrice] = useState('');


  useEffect(() => {
    if (guitarTypeFilters.length) {
      setFilteredGuitars(guitars.filter((guitar) => {
        if (guitarTypeFilters.some((guitarFilter) => guitarFilter === guitar.type)) {
          return guitar;
        }
      }));
    } else {
      setFilteredGuitars(guitars);
    }
  }, [guitarTypeFilters, guitars]);

  useEffect(() => {
    dispatch(updateGuitars(filteredGuitars));
  }, [dispatch, filteredGuitars, guitarStingCount]);

  useEffect(() => {
    setGuitarStringCount([...new Set(filteredGuitars.map((guitar) => guitar.stringCount))]);
  }, [filteredGuitars]);

  useEffect(() => {
    const lowAndHighPrices = filteredGuitars.map((guitar) => guitar.price).sort((a, b) => a - b);
    setGuitarsPrice([lowAndHighPrices[0], lowAndHighPrices[lowAndHighPrices.length - 1]]);
  }, [filteredGuitars]);

  useEffect(() => {
    dispatch(updateGuitars(filteredGuitars.filter((guitar) => guitar.price > guitarsPrice[0] && guitar.price < guitarsPrice[1])));
  }, [dispatch, filteredGuitars, guitarsPrice]);


  const onLowPriceEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (parseFloat(event.currentTarget.value) < guitarsPrice[0]) {
        return event.currentTarget.value = guitarsPrice[0].toString();
      }
      if (parseFloat(event.currentTarget.value) > guitarsPrice[1]) {
        return event.currentTarget.value = guitarsPrice[1].toString();
      }
      if (!lowPrice) {
        return setGuitarsPrice([guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[0], guitarsPrice[1]]);
      }
      setGuitarsPrice([parseFloat(event.currentTarget.value), guitarsPrice[1]]);

    }
  };


  const getQueryStringFromObject = (array: string[]) => console.log(new URLSearchParams(...array).toString());
  console.log(guitarTypeFilters);

  const onHighPriceEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (parseFloat(event.currentTarget.value) > guitarsPrice[1]) {
        return event.currentTarget.value = guitarsPrice[1].toString();
      }
      if (parseFloat(event.currentTarget.value) < guitarsPrice[0]) {
        return event.currentTarget.value = guitarsPrice[0].toString();
      }
      if (!highPrice) {
        return setGuitarsPrice([guitarsPrice[0], guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[guitars.length - 1]]);
      }
      setGuitarsPrice([guitarsPrice[0], parseFloat(event.currentTarget.value)]);

    }
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
              placeholder={guitarsPrice[0] !== undefined ? guitarsPrice[0].toString() : '0'}
              id="priceMin"
              name="от"
              onKeyDown={onLowPriceEnterKeyDown}
              value={lowPrice}
              onChange={(e) => setLowPrice(e.target.value)}
              onClick={() => getQueryStringFromObject(guitarTypeFilters)}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={guitarsPrice[1] !== undefined ? guitarsPrice[1].toString() : '0'}
              id="priceMax"
              name="до"
              onKeyDown={onHighPriceEnterKeyDown}
              value={highPrice}
              onChange={(e) => setHighPrice(e.target.value)}

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
            onChange={(evt) => {
              evt.currentTarget.checked ?
                setGuitarTypeFilters([...guitarTypeFilters, 'acoustic']) :

                setGuitarTypeFilters(guitarTypeFilters.filter((filter) => filter !== 'acoustic'));
            }}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={(evt) => {
              evt.currentTarget.checked ?
                setGuitarTypeFilters([...guitarTypeFilters, 'electric']) :

                setGuitarTypeFilters(guitarTypeFilters.filter((filter) => filter !== 'electric'));
            }}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={(evt) => {
              evt.currentTarget.checked ?
                setGuitarTypeFilters([...guitarTypeFilters, 'ukulele']) :

                setGuitarTypeFilters(guitarTypeFilters.filter((filter) => filter !== 'ukulele'));
            }}
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
            disabled={!guitarStingCount.includes(4)}
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
            disabled={!guitarStingCount.includes(6)}
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
            disabled={!guitarStingCount.includes(7)}
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
            disabled={!guitarStingCount.includes(12)}
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
