/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FilterParams, FIRST_PAGE, stringLabels, stringValues, ENTER_KEY, FilterByType, AppRoute, StringCount, BooleanToString, pageNavigationRoute, QueryParam } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import { setUserPriceMax, setUserPriceMin } from '../../store/action';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-actions';
import { getGuitars, getSortType, getSortOrder } from '../../store/selectors';
import { getMaxPrice, getMinPrice, getElementIdByStrings, getStringsByElementId, matchStringsWithType, getAvailableStringCountId } from '../../utils/utils';

function CatalogFilters(): JSX.Element {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();

  const guitars = useSelector(getGuitars);
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);

  const [currentTypes, setCurrentTypes] = useState<string[]>([]);
  const [currentStringCount, setcurrentStringCount] = useState<string[]>([]);
  const [availableStringCount, setAvailableStringCount] = useState<number[]>(stringValues);
  // const [currentAndAvailableStringCount, setCurrentAndAvailableStringCount] = useState<string[]>([]);
  const [userPriceMinValue, setUserPriceMinValue] = useState('');
  const [userPriceMaxValue, setUserPriceMaxValue] = useState('');

  const history = useHistory();
  const filterParams = useLocation<string>().search;

  const minPrice = getMinPrice(guitars);
  const maxPrice = getMaxPrice(guitars);

  const handlePriceMinChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserPriceMinValue(target.value);
  };
  const handlePriceMaxChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserPriceMaxValue(target.value);
  };

  const handlePriceMinBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set(QueryParam.PriceGte, target.value);
    if (+target.value < minPrice && target.value !== '') {
      setUserPriceMinValue(minPrice.toString());
      queryParams.set(QueryParam.PriceGte, minPrice.toString());
    }
    if (+target.value > maxPrice && target.value !== '') {
      setUserPriceMinValue(maxPrice.toString());
      queryParams.set(QueryParam.PriceGte, maxPrice.toString());
    }
    if (+target.value > +userPriceMaxValue && userPriceMaxValue !== '') {
      setUserPriceMinValue(userPriceMaxValue);
      queryParams.set(QueryParam.PriceGte, userPriceMaxValue);
    }
    queryParams.set(QueryParam.CurrentPageNumber, '0');
    dispatch(setUserPriceMin(target.value));
    if (target.value === '') {
      queryParams.delete(QueryParam.PriceGte);
    }
    history.push(`${AppRoute.Query}${queryParams.toString()}`);
  };

  const handlePriceMaxBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set(QueryParam.PriceLte, target.value);
    if (+target.value < minPrice && target.value !== '') {
      setUserPriceMaxValue(minPrice.toString());
      queryParams.set(QueryParam.PriceLte, minPrice.toString());

    }
    if (+target.value > maxPrice && target.value !== '') {
      setUserPriceMaxValue(maxPrice.toString());
      queryParams.set(QueryParam.PriceLte, maxPrice.toString());
    }
    if (+target.value < +userPriceMinValue && userPriceMinValue !== '') {
      setUserPriceMaxValue(userPriceMinValue);
      queryParams.set(QueryParam.PriceLte, userPriceMinValue);
    }
    queryParams.set(QueryParam.CurrentPageNumber, '0');
    dispatch(setUserPriceMax(target.value));
    if (target.value === '') {
      queryParams.delete(QueryParam.PriceLte);
    }
    history.push(`${AppRoute.Query}${queryParams.toString()}`);
  };

  const handleGuitarTypeCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    switch (target.name) {
      case FilterByType.Acoustic:
        queryParams.set(QueryParam.AcousticType, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case FilterByType.Electric:
        queryParams.set(QueryParam.ElectricType, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case FilterByType.Ukulele:
        queryParams.set(QueryParam.UkuleleType, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
    }
  };

  const handleGuitarStringCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    switch (target.name) {
      case StringCount.FourStrings:
        queryParams.set(QueryParam.FourString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case StringCount.SixStrings:
        queryParams.set(QueryParam.SixString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case StringCount.SevenStrings:
        queryParams.set(QueryParam.SevenString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case StringCount.TwelveStrings:
        queryParams.set(QueryParam.TwelveString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
    }
  };

  useEffect(() => {
    // dispatch(fetchFilteredGuitarsAction(filterParams, sortType, sortOrder, FIRST_PAGE));
    dispatch(fetchGuitarsCountAction(filterParams));
  }, [dispatch, filterParams, sortOrder, sortType]);

  useEffect(() => {
    stringValues.forEach((value) => {
      document.getElementById(`${getElementIdByStrings(value)}`)?.setAttribute('disabled', 'true');
    });

    availableStringCount.forEach((value) => {
      document.getElementById(`${getElementIdByStrings(value)}`)?.removeAttribute('disabled');
    });

    // setCurrentAndAvailableStringCount(currentStringCount.filter((element) => getAvailableStringCountId(availableStringCount).includes(element)));
  }, [availableStringCount, currentStringCount]);

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
    // setCurrentAndAvailableStringCount(currentStringCount.filter((element) => getAvailableStringCountId(availableStringCount).includes(element)));
  };

  // const handleKeyPress = (event: { key: string; }) => {
  //   if (event.key === ENTER_KEY) {
  //     handlePriceMinChange();
  //     handlePriceMaxChange();
  //   }
  // };

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
              placeholder={`${minPrice}`}
              id="priceMin"
              name="от"
              value={userPriceMinValue}
              onChange={handlePriceMinChange}
              onBlur={handlePriceMinBlur}
              data-testid="minPrice"
            >
            </input>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={`${maxPrice}`}
              id="priceMax"
              name="до"
              value={userPriceMaxValue}
              onChange={handlePriceMaxChange}
              onBlur={handlePriceMaxBlur}
              data-testid="maxPrice"
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
            }}
            onChange={handleGuitarTypeCheck}
            checked={queryParams.has(QueryParam.AcousticType) ? Boolean(Number(queryParams.get(QueryParam.AcousticType))) : false}
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
            }}
            onChange={handleGuitarTypeCheck}
            checked={queryParams.has(QueryParam.ElectricType) ? Boolean(Number(queryParams.get(QueryParam.ElectricType))) : false}
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
            }}
            onChange={handleGuitarTypeCheck}
            checked={queryParams.has(QueryParam.UkuleleType) ? Boolean(Number(queryParams.get(QueryParam.UkuleleType))) : false}
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
            }}
            checked={queryParams.has(QueryParam.FourString) ? Boolean(Number(queryParams.get(QueryParam.FourString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="4-strings">{stringLabels.fourStrings}</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParam.SixString) ? Boolean(Number(queryParams.get(QueryParam.SixString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="6-strings">{stringLabels.sixStrings}</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParam.SevenString) ? Boolean(Number(queryParams.get(QueryParam.SevenString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="7-strings">{stringLabels.sevenStrings}</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParam.TwelveString) ? Boolean(Number(queryParams.get(QueryParam.TwelveString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="12-strings">{stringLabels.twelveStrings}</label>
        </div>
      </fieldset>

    </form>
  );
}

export default CatalogFilters;
