import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FilterParams, FIRST_PAGE, pageNavigationRoute, stringValues } from '../../const';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-action';
import { getGuitars, getSortType, getSortOrder } from '../../store/selectors';
import { getMaxPrice, getMinPrice, getElementIdByStrings, getStringsByElementId, matchStringsWithType } from '../../utils/utils';

function CatalogFilter(): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const sort = useSelector(getSortType);
  const order = useSelector(getSortOrder);

  const [currentTypes, setCurrentTypes] = useState<string[]>([]);
  const [currentStringCount, setcurrentStringCount] = useState<string[]>([]);
  const [availableStringCount, setAvailableStringCount] = useState<number[]>(stringValues);

  const history = useHistory();
  const filterParams = useLocation<string>().search;

  const minPrice = getMinPrice(guitars);
  const maxPrice = getMaxPrice(guitars);

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, FIRST_PAGE));
    dispatch(fetchGuitarsCountAction(filterParams));

    stringValues.forEach((value) => {
      document.getElementById(`${getElementIdByStrings(value)}`)?.setAttribute('disabled', 'true');
    });

    availableStringCount.forEach((value) => {
      document.getElementById(`${getElementIdByStrings(value)}`)?.removeAttribute('disabled');
    });
  }, [availableStringCount, dispatch, filterParams, order, sort]);

  const priceMinRef = useRef<HTMLInputElement | null>(null);
  const priceMaxRef = useRef<HTMLInputElement | null>(null);

  const handleFiltersInput = () => {
    let filtersInput = '?';

    if (priceMinRef.current?.value) {
      filtersInput += `${FilterParams.MinPrice}${priceMinRef.current?.value}&`;
    }

    if (priceMaxRef.current?.value) {
      filtersInput += `${FilterParams.MaxPrice}${priceMaxRef.current?.value}&`;
    }

    currentTypes.map((type) => filtersInput += `${FilterParams.Type}${type}&`);

    currentStringCount.map((stringCount) => filtersInput += `${FilterParams.FilterStringCount}${getStringsByElementId(stringCount)}&`);

    history.push(String(pageNavigationRoute.PageNaviation(FIRST_PAGE, filtersInput)));

    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, FIRST_PAGE));
    dispatch(fetchGuitarsCountAction(filterParams));
  };

  const handleTypeInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentTypes.push(target.id);
      setCurrentTypes(currentTypes);
    } else {
      const index = currentTypes.indexOf(target.id);
      currentTypes.splice(index, 1);
    }

    if (currentTypes.length === 0) {
      setAvailableStringCount(stringValues);
    } else {
      setAvailableStringCount(matchStringsWithType(currentTypes));
    }
  };

  const handleStringCountInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentStringCount.push(target.id);
      setcurrentStringCount(currentStringCount);
    } else {
      const index = currentStringCount.indexOf(target.id);
      currentStringCount.splice(index, 1);
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
              type="number"
              placeholder={minPrice.toString()}
              id="priceMin"
              name="от"
              min="0"
              ref={priceMinRef}
              onInput={handleFiltersInput}
            >
            </input>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={maxPrice.toString()}
              id="priceMax"
              name="до"
              min="0"
              ref={priceMaxRef}
              onInput={handleFiltersInput}
            >
            </input>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onInput={(event) => {
              handleTypeInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onInput={(event) => {
              handleTypeInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onInput={(event) => {
              handleTypeInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onInput={(event) => {
              handleStringCountInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onInput={(event) => {
              handleStringCountInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onInput={(event) => {
              handleStringCountInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onInput={(event) => {
              handleStringCountInput(event);
              handleFiltersInput();
            }}
          >
          </input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>

    </form>
  );
}

export default CatalogFilter;
