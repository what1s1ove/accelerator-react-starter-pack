import { GuitarName } from '../components/consts/consts';
import { Guitar } from '../types/shop-types';

const translateNameOfGuitar = (type: string | undefined) => {
  switch (type) {
    case GuitarName.Electric: {
      return 'Электрогитара';
    }
    case GuitarName.Acoustic: {
      return 'Акустическая';
    }
    case GuitarName.Ukulele: {
      return 'Укулеле';
    }
    default: {
      return '';
    }
  }
};

const sortByPrice = (guitars: Guitar[], isSortedFromHighToLow: boolean, isSortedFromLowToHigh: boolean) => {
  if (isSortedFromHighToLow) {
    return guitars.sort((a: Guitar, b: Guitar) => b.price - a.price);
  }
  if (isSortedFromLowToHigh) {
    return guitars.sort((a: Guitar, b: Guitar) => a.price - b.price);
  }
  return guitars.sort((a: Guitar, b: Guitar) => b.price - a.price);
};


const sortByRating = (guitars: Guitar[], isSortedFromHighToLow: boolean, isSortedFromLowToHigh: boolean) => {
  if (isSortedFromHighToLow) {
    return guitars.sort((a: Guitar, b: Guitar) => b.rating - a.rating);
  }

  if (isSortedFromLowToHigh) {
    return guitars.sort((a: Guitar, b: Guitar) => a.rating - b.rating);
  }
  return guitars.sort((a: Guitar, b: Guitar) => b.rating - a.rating);
};

const getObjectFromQueryString = (search: string) => {
  const paramsEntries = new URLSearchParams(search).entries();


  return Object.fromEntries(paramsEntries);
};

const getQueryStringFromObject = (filter: any) => new URLSearchParams(filter).toString();

export {
  getQueryStringFromObject,
  getObjectFromQueryString,
  translateNameOfGuitar,
  sortByPrice,
  sortByRating
};
