import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType, StringCounts, strings } from '../../const';
import { setPriceFrom, setPriceTo, toggleNumberString, toggleTypeGuitar } from '../../store/action';
import { fetchGuitarsAction } from '../../store/api-actions';
import {
  getMaxPrice,
  getMinPrice,
  getNumberStrings,
  getPriceFrom,
  getPriceTo,
  getTypeGuitars } from '../../store/guitars/selectors';
import { translateTypeGuitars } from '../../utils/utils';

function Filter(): JSX.Element {
  const priceFrom = useSelector(getPriceFrom);
  const priceTo = useSelector(getPriceTo);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const typeGuitars = useSelector(getTypeGuitars);
  const numberStrings = useSelector(getNumberStrings);
  const dispatch = useDispatch();

  const handlePriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(evt.target.value, 10);
    switch(evt.target.id) {
      case 'priceMin':
        dispatch(setPriceFrom(price));
        break;
      case 'priceMax':
        dispatch(setPriceTo(price));
        break;
    }
  };

  const handlePriceFieldBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    let price: number | undefined = parseInt(evt.target.value, 10);
    if (isNaN(price)) {
      price = undefined;
    } else {
      if (price < minPrice) {
        price = minPrice;
      }
      if (price > maxPrice) {
        price = maxPrice;
      }
    }
    switch(evt.target.id) {
      case 'priceMin':
        dispatch(setPriceFrom(price));
        dispatch(fetchGuitarsAction());
        break;
      case 'priceMax':
        dispatch(setPriceTo(price));
        dispatch(fetchGuitarsAction());
        break;
    }
  };

  const handleTypeGuitarsChange = (type: GuitarsType) => {
    dispatch(toggleTypeGuitar(type));
    dispatch(fetchGuitarsAction());
  };

  const handleNumberStringsChange = (string: number) => {
    dispatch(toggleNumberString(string));
    dispatch(fetchGuitarsAction());
  };

  let avaliableStringNumber: number[] = [];
  if (typeGuitars.length === 0) {
    avaliableStringNumber = strings;
  }
  typeGuitars.forEach((typeGuitar) =>
    avaliableStringNumber = [...avaliableStringNumber, ...StringCounts[typeGuitar]],
  );

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              onChange={handlePriceChange}
              onBlur={handlePriceFieldBlur}
              type="number"
              value={priceFrom}
              placeholder="1 000"
              id="priceMin"
              name="от"
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              onChange={handlePriceChange}
              onBlur={handlePriceFieldBlur}
              type="number"
              value={priceTo}
              placeholder="30 000"
              id="priceMax"
              name="до"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          Object.values(GuitarsType).map((type) => (
            <div key={type} className="form-checkbox catalog-filter__block-item">
              <input
                onChange={() => handleTypeGuitarsChange(type)}
                className="visually-hidden"
                type="checkbox"
                id={type}
                name={type}
                checked={typeGuitars.includes(type)}
              />
              <label htmlFor={type}>{translateTypeGuitars(type)}</label>
            </div>
          ))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          strings.map((string) => (
            <div key={string} className="form-checkbox catalog-filter__block-item">
              <input
                onChange={() => handleNumberStringsChange(string)}
                className="visually-hidden"
                type="checkbox"
                id={`${string}-strings`}
                name={`${string}-strings`}
                checked={numberStrings.includes(string)}
                disabled={!avaliableStringNumber.includes(string)}
              />
              <label htmlFor={`${string}-strings`}>{string}</label>
            </div>
          ))
        }
      </fieldset>
    </form>
  );
}

export default Filter;
