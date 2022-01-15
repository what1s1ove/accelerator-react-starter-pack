import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GuitarsType, strings } from '../../const';
import { fetchGuitarsAction } from '../../store/api-actions';
import { getGuitarsList, getMaxPrice, getMinPrice } from '../../store/guitars/selectors';
import { toggleArrayElement } from '../../utils/utils';
import Footer from '../footer/footer';
import GuitarsList from '../guitars-list/guitars-list';
import Header from '../header/header';
function Catalog(): JSX.Element {
  const [priceFrom, setPriceFrom] = useState<number>();
  const [priceTo, setPriceTo] = useState<number>();
  const [typeGuitars, setTypeGuitars] = useState<string[]>([]);
  const [numberStrings, setNumberStrings] = useState<number[]>([]);

  const guitars = useSelector(getGuitarsList);
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

  let filteredGuitars = guitars.slice();

  if (priceFrom && priceTo) {
    filteredGuitars = filteredGuitars.filter((guitar) => (guitar.price >= priceFrom) && (guitar.price <= priceTo));
  } else if (priceFrom) {
    filteredGuitars = filteredGuitars.filter((guitar) => guitar.price >= priceFrom);
  } else if (priceTo) {
    filteredGuitars = filteredGuitars.filter((guitar) => guitar.price <= priceTo);
  }

  for (const type of Object.values(GuitarsType)) {
    if (typeGuitars.includes(type)) {
      filteredGuitars = filteredGuitars.filter((guitar) =>
        typeGuitars.includes(guitar.type));
    }
  }

  for (const string of strings) {
    if (numberStrings.includes(string)) {
      filteredGuitars = filteredGuitars.filter((guitar) =>
        numberStrings.includes(guitar.stringCount));
    }
  }
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="./main.html">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="">Каталог</Link>
            </li>
          </ul>
          <div className="catalog">
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
                {
                  strings.map((string) => (
                    <div key={string} className="form-checkbox catalog-filter__block-item">
                      <input
                        onChange={() => {
                          setNumberStrings(toggleArrayElement(numberStrings, string));
                        }}
                        className="visually-hidden"
                        type="checkbox"
                        id={`${string}-strings`}
                        name={`${string}-strings`}
                        checked={numberStrings.includes(string)}
                        disabled={!numberStrings}
                      />
                      <label htmlFor={`${string}-strings`}>{string}</label>
                    </div>
                  ))
                }
              </fieldset>
            </form>
            <GuitarsList filteredGuitars={filteredGuitars} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
