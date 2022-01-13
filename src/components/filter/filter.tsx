import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../const';
import { fetchGuitarsAction } from '../../store/api-actions';
import { getMaxPrice, getMinPrice } from '../../store/guitars/selectors';
import { toggleArrayElement } from '../../utils/utils';

function Filter(): JSX.Element {
  const [priceFrom, setPriceFrom] = useState<number>();
  const [priceTo, setPriceTo] = useState<number>();
  const [typeGuitars, setTypeGuitars] = useState<GuitarsType[]>([]);
  const [numberStrings, setNumberStrings] = useState<number[]>([]);

  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGuitarsAction());
  }, [dispatch]);

  const handlePriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(evt.target.value, 10);
    switch(evt.target.id) {
      case 'priceMin':
        setPriceFrom(price);
        break;
      case 'priceMax':
        setPriceTo(price);
        break;
    }
  };

  const handlePriceFieldBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    let price = parseInt(evt.target.value, 10);
    if (price < minPrice) {
      price = minPrice;
    }
    if (price > maxPrice) {
      price = maxPrice;
    }
    switch(evt.target.id) {
      case 'priceMin':
        setPriceFrom(price);
        break;
      case 'priceMax':
        setPriceTo(price);
        break;
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
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setTypeGuitars(toggleArrayElement(typeGuitars, GuitarsType.Acoustic));
            }}
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={typeGuitars.includes(GuitarsType.Acoustic)}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setTypeGuitars(toggleArrayElement(typeGuitars, GuitarsType.Electric));
            }}
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={typeGuitars.includes(GuitarsType.Electric)}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setTypeGuitars(toggleArrayElement(typeGuitars, GuitarsType.Ukulele));
            }}
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={typeGuitars.includes(GuitarsType.Ukulele)}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setNumberStrings(toggleArrayElement(numberStrings, 4));
            }}
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            checked={numberStrings.includes(4)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setNumberStrings(toggleArrayElement(numberStrings, 6));
            }}
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            checked={numberStrings.includes(6)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setNumberStrings(toggleArrayElement(numberStrings, 7));
            }}
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            checked={numberStrings.includes(7)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setNumberStrings(toggleArrayElement(numberStrings, 12));
            }}
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            checked={numberStrings.includes(12)}
            disabled
          />
          <label htmlFor="12-strings">12</label>
        </div>
        <p>{numberStrings}</p>
      </fieldset>
    </form>
  );
}

export default Filter;
