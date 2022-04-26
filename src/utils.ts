import {Guitar} from './types/guitar';
import {Sorts} from './const';

function sortingByParametr(guitars: Guitar[], activeSort: Sorts): Guitar[] {
  if (activeSort === Sorts.byPrice) {
    return sortingByPrice(guitars);
  }
  if (activeSort === Sorts.byPopular) {
    return sortingByPopular(guitars);
  }
  return guitars;
}

function sortingByPrice(guitars: Guitar[]): Guitar[] {
  return guitars.sort((value1, value2) => {
    if (value1.price < value2.price) {
      return -1;
    }
    if (value1.price > value2.price) {
      return 1;
    }
    return 0;
  });
}

function sortingByPopular(guitars: Guitar[]): Guitar[] {
  return guitars.sort((value1, value2) => {
    if (value1.rating < value2.rating) {
      return -1;
    }
    if (value1.rating > value2.rating) {
      return 1;
    }
    return 0;
  });
}

export {
  sortingByParametr
};
