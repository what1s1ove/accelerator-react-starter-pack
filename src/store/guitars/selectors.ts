import { SortOrderOptions, SortTypeOptions } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getMinPriceGuitar = (minPriceGuitar: Guitar, currentGuitar: Guitar) => (
  currentGuitar.price < minPriceGuitar.price ? currentGuitar : minPriceGuitar
);

const getMaxPriceGuitar = (maxPriceGuitar: Guitar, currentGuitar: Guitar) => (
  currentGuitar.price > maxPriceGuitar.price ? maxPriceGuitar : maxPriceGuitar
);

export const getGuitarsList = (state: State): Guitar[] => state[NameSpace.Guitars].guitars.slice();
export const getSortType = (state: State): SortTypeOptions => state[NameSpace.Guitars].sortType;
export const getSortOrder = (state: State): SortOrderOptions => state[NameSpace.Guitars].sortOrder;
export const getMinPrice = (state: State): number => {
  const guitarsList = state[NameSpace.Guitars].guitars;
  if (guitarsList.length === 0) {
    return 0;
  }
  return guitarsList.reduce(getMinPriceGuitar).price;
};
export const getMaxPrice = (state: State): number => {
  const guitarsList = state[NameSpace.Guitars].guitars;
  if (guitarsList.length === 0) {
    return 0;
  }
  return guitarsList.reduce(getMaxPriceGuitar).price;
};
