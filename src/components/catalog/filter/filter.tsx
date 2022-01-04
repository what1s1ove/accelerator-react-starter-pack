import {useFetchMaxPriceQuery, useFetchMinPriceQuery} from '../../../service/api';
import {ChangeEvent} from 'react';
import {StringFilter, TypeFilter} from '../../../const/const';
import {StringCount, Type} from '../catalog';
import _ from 'lodash';

type FilterProps = {
  stateType: Type;
  stateStringCount: StringCount;
  statePriceMin: string | number |undefined;
  statePriceMax: string | number |undefined;
  onStateTypeChange: (type: Type) => void;
  onStateStringCountChange: (stringCount: StringCount) => void;
  onStateMinPriceChange: (minPrice: string | number | undefined) => void;
  onStateMaxPriceChange: (maxPrice: string | number | undefined) => void;
  viewState: {[p: string]: string};
  changeURL: (updatedViewState: {[p: string]: string}) => void;
}

let localType:string[] = [];
let localStringCount:string[] = [];

function Filter ({stateType, stateStringCount, statePriceMin, statePriceMax, onStateTypeChange, onStateStringCountChange, onStateMinPriceChange, onStateMaxPriceChange, viewState, changeURL}:FilterProps):JSX.Element {
  const {data: minPriceGuitar} = useFetchMinPriceQuery('');
  const {data: maxPriceGuitar} = useFetchMaxPriceQuery('');

  const deleteType = (filterItem: string) => {
    const index = localType.findIndex((item) => item === filterItem);
    localType = [
      ...localType.slice(0, index),
      ...localType.slice(index + 1),
    ];
  };

  const deleteStringCount = (stringCountItem:string) => {
    const index = localStringCount.findIndex((item) => item === stringCountItem);
    localStringCount = [
      ...localStringCount.slice(0, index),
      ...localStringCount.slice(index + 1),
    ];
  };

  const stringifyLocalType = (items: string[]) => {
    if (items.length > 1) {
      return items.join('&type=');
    }
    return items.join('');
  };

  const stringifyLocalStringCount = (items: string[]) => {
    if (items.length > 1) {
      return items.join('&stringCount=');
    }
    return  items.join('');
  };

  const isFourStringsDisabled = ():boolean => stateType.acoustic === TypeFilter.Acoustic && stateType.electric === '' && stateType.ukulele === '';
  const isSixStringsDisabled = ():boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
  const isSevenStringsDisabled = ():boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
  const isTwelveStringsDisabled = ():boolean => (stateType.ukulele === TypeFilter.Ukulele || stateType.electric === TypeFilter.Electric) && stateType.acoustic === '';

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={minPriceGuitar && `${minPriceGuitar[0].price}`} id="priceMin" name="от"
              value={statePriceMin}
              onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                target.value === '0' && minPriceGuitar ? onStateMinPriceChange(minPriceGuitar[0].price) : onStateMinPriceChange(target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={maxPriceGuitar && `${maxPriceGuitar[0].price}`} id="priceMax" name="до"
              value={statePriceMax}
              onChange={({target}:ChangeEvent<HTMLInputElement>) => {
                target.value === '0' && maxPriceGuitar ? onStateMaxPriceChange(maxPriceGuitar[0].price) : onStateMaxPriceChange(target.value);
              }}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
            checked={stateType.acoustic === TypeFilter.Acoustic}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateType.acoustic?.length === 0) {
                onStateTypeChange({...stateType, acoustic: target.name});
                localType = [...localType, target.name];
                changeURL({...viewState, 'type': stringifyLocalType(localType)});
              } else {
                onStateTypeChange({...stateType, acoustic: ''});
                deleteType(TypeFilter.Acoustic);
                if (localType.length === 0) {
                  const newViewState = _.omit(viewState, 'type');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'type': stringifyLocalType(localType)});
                }
              }
            }}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked={stateType.electric === TypeFilter.Electric}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateType.electric?.length === 0) {
                onStateTypeChange({...stateType, electric: target.name});
                localType = [...localType, target.name];
                changeURL({...viewState, 'type': stringifyLocalType(localType)});
              } else {
                onStateTypeChange({...stateType, electric: ''});
                deleteType(TypeFilter.Electric);
                if (localType.length === 0) {
                  const newViewState = _.omit(viewState, 'type');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'type': stringifyLocalType(localType)});
                }
              }
            }}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={stateType.ukulele === TypeFilter.Ukulele}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateType.ukulele?.length === 0) {
                onStateTypeChange({...stateType, ukulele: target.name});
                localType = [...localType, target.name];
                changeURL({...viewState, 'type': stringifyLocalType(localType)});
              } else {
                onStateTypeChange({...stateType, ukulele: ''});
                deleteType(TypeFilter.Ukulele);
                if (localType.length === 0) {
                  const newViewState = _.omit(viewState, 'type');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'type': stringifyLocalType(localType)});
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
            checked={stateStringCount.fourStrings === StringFilter.FourStrings}
            disabled={isFourStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateStringCount.fourStrings?.length === 0) {
                onStateStringCountChange({...stateStringCount, fourStrings: target.name});
                localStringCount = [...localStringCount, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyLocalStringCount(localStringCount)});
              } else {
                onStateStringCountChange({...stateStringCount, fourStrings: ''});
                deleteStringCount(StringFilter.FourStrings.charAt(0));
                if (localStringCount.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyLocalType(localStringCount)});
                }
              }
            }}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"
            checked={stateStringCount.sixStrings === StringFilter.SixStrings}
            disabled={isSixStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateStringCount.sixStrings?.length === 0) {
                onStateStringCountChange({...stateStringCount, sixStrings: target.name});
                localStringCount = [...localStringCount, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyLocalStringCount(localStringCount)});
              } else {
                onStateStringCountChange({...stateStringCount, sixStrings: ''});
                deleteStringCount(StringFilter.SixStrings.charAt(0));
                if (localStringCount.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyLocalType(localStringCount)});
                }
              }
            }}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"
            checked={stateStringCount.sevenStrings === StringFilter.SevenStrings}
            disabled={isSevenStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) => {
              if (stateStringCount.sevenStrings?.length === 0) {
                onStateStringCountChange({...stateStringCount, sevenStrings: target.name});
                localStringCount = [...localStringCount, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyLocalStringCount(localStringCount)});
              } else {
                onStateStringCountChange({...stateStringCount, sevenStrings: ''});
                deleteStringCount(StringFilter.SevenStrings.charAt(0));
                if (localStringCount.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyLocalType(localStringCount)});
                }
              }
            }}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"
            checked={stateStringCount.twelveStrings === StringFilter.TwelveStrings}
            disabled={isTwelveStringsDisabled()}
            onChange={({target}:ChangeEvent<HTMLInputElement>) =>  {
              if (stateStringCount.twelveStrings?.length === 0) {
                onStateStringCountChange({...stateStringCount, twelveStrings: target.name});
                localStringCount = [...localStringCount, target.name.charAt(0)];
                changeURL({...viewState, 'stringCount': stringifyLocalStringCount(localStringCount)});
              } else {
                onStateStringCountChange({...stateStringCount, twelveStrings: ''});
                deleteStringCount(StringFilter.TwelveStrings.charAt(0));
                if (localStringCount.length === 0) {
                  const newViewState = _.omit(viewState, 'stringCount');
                  changeURL(newViewState);
                } else {
                  changeURL({...viewState, 'stringCount': stringifyLocalType(localStringCount)});
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
