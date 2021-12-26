import {Guitar, GuitarsList} from '../types/guitar';

export const INITIAL_GUITARS_COUNT = 9;

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export enum AppRoute {
  Root = '/'
}

export enum SortType {
  Price = 'по цене',
  Popularity = 'по популярности',
  DownUp = 'По возрастанию',
  UpDown = 'По убыванию'
}

const sortByPriceDownUp = (guitarA:Guitar, guitarB:Guitar) => guitarA.price - guitarB.price;
const sortByPriceUpDown = (guitarA:Guitar, guitarB:Guitar) => guitarB.price - guitarA.price;
const sortByPopularityDownUp = (guitarA:Guitar, guitarB:Guitar) => guitarA.rating - guitarB.rating;
const sortByPopularityUpDown = (guitarA:Guitar, guitarB:Guitar) => guitarB.rating - guitarA.rating;

export const getSortedGuitarsList = (guitars:GuitarsList, typeSort:string, increaseSort:string):GuitarsList => {
  const sortedGuitars = [...guitars];
  if (typeSort === SortType.Price) {
    switch (increaseSort) {
      case SortType.DownUp:
        sortedGuitars.sort(sortByPriceDownUp);
        break;
      case SortType.UpDown:
        sortedGuitars.sort(sortByPriceUpDown);
        break;
      default: sortedGuitars.sort(sortByPriceDownUp);
    }
  }
  if (typeSort === SortType.Popularity) {
    switch (increaseSort) {
      case SortType.DownUp:
        sortedGuitars.sort(sortByPopularityDownUp);
        break;
      case SortType.UpDown:
        sortedGuitars.sort(sortByPopularityUpDown);
        break;
      default: sortedGuitars.sort(sortByPopularityDownUp);
    }
  }

  return sortedGuitars;
};
