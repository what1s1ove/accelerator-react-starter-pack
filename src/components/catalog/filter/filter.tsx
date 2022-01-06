import {useFetchMaxPriceQuery, useFetchMinPriceQuery} from '../../../service/api';
import {ChangeEvent, useCallback, useState} from 'react';
import {
  QUERY_MAX_PRICE,
  QUERY_MIN_PRICE,
  StringFilter,
  TypeFilter
} from '../../../const/const';
import {StringCount, Type, ViewState} from '../catalog';
import _ from 'lodash';

type FilterProps = {
  viewState: ViewState;
  changeURL: (updatedViewState: ViewState) => void;
}

let checkedTypeFilters:string[] = [];
let checkedStringCountFilters:string[] = [];

const deleteUncheckedTypeFilter = (filterItem: string) => {
  const index = checkedTypeFilters.findIndex((item) => item === filterItem);
  checkedTypeFilters = [
    ...checkedTypeFilters.slice(0, index),
    ...checkedTypeFilters.slice(index + 1),
  ];
};

const stringifyCheckedTypeFilters = (items: string[]) => {
  if (items.length > 1) {
    return items.join('&type=');
  }
  return items.join('');
};

const stringifyCheckedStringCountFilters = (items: string[]) => {
  if (items.length > 1) {
    return items.join('&stringCount=');
  }
  return  items.join('');
};

const deleteUncheckedStringCountFilter = (stringCountItem:string) => {
  const index = checkedStringCountFilters.findIndex((item) => item === stringCountItem);
  checkedStringCountFilters = [
    ...checkedStringCountFilters.slice(0, index),
    ...checkedStringCountFilters.slice(index + 1),
  ];
};

function Filter ({viewState, changeURL}:FilterProps):JSX.Element {
  const [stateType, setStateType] = useState<Type>({acoustic: '', electric: '', ukulele: ''});
  const [stateStringCount, setStateStringCount] = useState<StringCount>({fourStrings: '', sixStrings: '', sevenStrings: '', twelveStrings: ''});
  const [stateMinimumPrice, setStateMinimumPrice] = useState<string | undefined>('');
  const [stateMaximumPrice, setStateMaximumPrice] = useState<string | undefined>('');

  const isAcousticChecked = viewState.type?.includes(TypeFilter.Acoustic);
  const isElectricChecked = viewState.type?.includes(TypeFilter.Electric);
  const isUkuleleChecked = viewState.type?.includes(TypeFilter.Ukulele);

  const isFourStringsChecked = viewState.stringCount?.includes(StringFilter.FourStrings.charAt(0));
  const isSixStringsChecked = viewState.stringCount?.includes(StringFilter.SixStrings.charAt(0));
  const isSevenStringsChecked = viewState.stringCount?.includes(StringFilter.SevenStrings.charAt(0));
  const isTwelveStringsChecked = viewState.stringCount?.includes(StringFilter.TwelveStrings.charAt(0));

  const isFourStringsDisabled = ():boolean => stateType.acoustic === TypeFilter.Acoustic && stateType.electric === '' && stateType.ukulele === '';
  const isSixStringsDisabled = ():boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
  const isSevenStringsDisabled = ():boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
  const isTwelveStringsDisabled = ():boolean => (stateType.ukulele === TypeFilter.Ukulele || stateType.electric === TypeFilter.Electric) && stateType.acoustic === '';

  const {data: minPrice} = useFetchMinPriceQuery({type: viewState.type, stringCount: viewState.stringCount});
  const {data: maxPrice} = useFetchMaxPriceQuery({type: viewState.type, stringCount: viewState.stringCount});

  const minCatalogPrice = minPrice && minPrice[0].price.toString();
  const maxCatalogPrice = maxPrice && maxPrice[0].price.toString();

  const deletePriceFromURL = (field:string, value:string) => {
    if (value.length === 0 && field === QUERY_MIN_PRICE) {
      const newViewState = _.omit(viewState, QUERY_MIN_PRICE);
      return changeURL(newViewState);
    }
    else if (value.length === 0 && field === QUERY_MAX_PRICE) {
      const newViewState = _.omit(viewState, QUERY_MAX_PRICE);
      return changeURL(newViewState);
    }
  };

  const replaceMinPrice = () => {
    setStateMinimumPrice(minCatalogPrice);
    return changeURL({...viewState, 'price_gte': minCatalogPrice});
  };

  const replaceMaxPrice = () => {
    setStateMaximumPrice(maxCatalogPrice);
    return changeURL({...viewState, 'price_lte': maxCatalogPrice});
  };

  const debouncedChangeURL = useCallback(
    _.debounce((field: string, value:string) => {
      if (value.length === 0) {
        return deletePriceFromURL(field, value);
      }
      if (Number(value) < Number(minCatalogPrice)) {
        return replaceMinPrice();
      }
      if (Number(value) > Number(maxCatalogPrice)) {
        return replaceMaxPrice();
      }
      changeURL({...viewState, [field]: value});
    }, 1000)
    , [viewState]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={minCatalogPrice && minCatalogPrice} id="priceMin" name="от"
              value={stateMinimumPrice}
              onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                setStateMinimumPrice(target.value);
                debouncedChangeURL(QUERY_MIN_PRICE, target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={maxCatalogPrice && maxCatalogPrice} id="priceMax" name="до"
              value={stateMaximumPrice}
              onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                setStateMaximumPrice(target.value);
                debouncedChangeURL(QUERY_MAX_PRICE, target.value);
              }}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
            checked={isAcousticChecked}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateType.acoustic?.length === 0) {
                setStateType({...stateType, acoustic: TypeFilter.Acoustic});
                checkedTypeFilters = [...checkedTypeFilters, target.name];
                changeURL({...viewState, 'type': stringifyCheckedTypeFilters(checkedTypeFilters)});
              } else {
                setStateType({...stateType, acoustic: ''});
                deleteUncheckedTypeFilter(TypeFilter.Acoustic);
                if (checkedTypeFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'type');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'type': stringifyCheckedTypeFilters(checkedTypeFilters)});
                }
              }
            }}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric"
            checked={isElectricChecked}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateType.electric?.length === 0) {
                setStateType({...stateType, electric: TypeFilter.Electric});
                checkedTypeFilters = [...checkedTypeFilters, target.name];
                changeURL({...viewState, 'type': stringifyCheckedTypeFilters(checkedTypeFilters)});
              } else {
                setStateType({...stateType, electric: ''});
                deleteUncheckedTypeFilter(TypeFilter.Electric);
                if (checkedTypeFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'type');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'type': stringifyCheckedTypeFilters(checkedTypeFilters)});
                }
              }
            }}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"
            checked={isUkuleleChecked}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateType.ukulele?.length === 0) {
                setStateType({...stateType, ukulele: TypeFilter.Ukulele});
                checkedTypeFilters = [...checkedTypeFilters, target.name];
                changeURL({...viewState, 'type': stringifyCheckedTypeFilters(checkedTypeFilters)});
              } else {
                setStateType({...stateType, ukulele: ''});
                deleteUncheckedTypeFilter(TypeFilter.Ukulele);
                if (checkedTypeFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'type');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'type': stringifyCheckedTypeFilters(checkedTypeFilters)});
                }
              }
            }}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"
            checked={isFourStringsChecked}
            disabled={isFourStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateStringCount.fourStrings?.length === 0) {
                setStateStringCount({...stateStringCount, fourStrings: StringFilter.FourStrings});
                checkedStringCountFilters = [...checkedStringCountFilters, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
              } else {
                setStateStringCount({...stateStringCount, fourStrings: ''});
                deleteUncheckedStringCountFilter(StringFilter.FourStrings.charAt(0));
                if (checkedStringCountFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyCheckedTypeFilters(checkedStringCountFilters)});
                }
              }
            }}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"
            checked={isSixStringsChecked}
            disabled={isSixStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateStringCount.sixStrings?.length === 0) {
                setStateStringCount({...stateStringCount, sixStrings: StringFilter.SixStrings});
                checkedStringCountFilters = [...checkedStringCountFilters, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
              } else {
                setStateStringCount({...stateStringCount, sixStrings: ''});
                deleteUncheckedStringCountFilter(StringFilter.SixStrings.charAt(0));
                if (checkedStringCountFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
                }
              }
            }}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"
            checked={isSevenStringsChecked}
            disabled={isSevenStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateStringCount.sevenStrings?.length === 0) {
                setStateStringCount({...stateStringCount, sevenStrings: StringFilter.SevenStrings});
                checkedStringCountFilters = [...checkedStringCountFilters, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
              } else {
                setStateStringCount({...stateStringCount, sevenStrings: ''});
                deleteUncheckedStringCountFilter(StringFilter.SevenStrings.charAt(0));
                if (checkedStringCountFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
                }
              }
            }}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"
            checked={isTwelveStringsChecked}
            disabled={isTwelveStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) =>  {
              if (stateStringCount.twelveStrings?.length === 0) {
                setStateStringCount({...stateStringCount, twelveStrings: StringFilter.TwelveStrings});
                checkedStringCountFilters = [...checkedStringCountFilters, target.name.slice(0, 2)];
                changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
              } else {
                setStateStringCount({...stateStringCount, twelveStrings: ''});
                deleteUncheckedStringCountFilter(StringFilter.TwelveStrings.slice(0, 2));
                if (checkedStringCountFilters.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyCheckedStringCountFilters(checkedStringCountFilters)});
                }
              }
            }}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
