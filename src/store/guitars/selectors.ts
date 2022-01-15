import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getMinPriceGuitar = (minPriceGuitar: Guitar, currentGuitar: Guitar) => (
  currentGuitar.price < minPriceGuitar.price ? currentGuitar : minPriceGuitar
);

const getMaxPriceGuitar = (maxPriceGuitar: Guitar, currentGuitar: Guitar) => (
  currentGuitar.price > maxPriceGuitar.price ? currentGuitar : maxPriceGuitar
);

export const getGuitarsList = (state: State): Guitar[] => state[NameSpace.Guitars].guitars.slice();
export const getSearchString = (state: State): string => state[NameSpace.Guitars].searchString;
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
