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
  Ascend = 'По возрастанию',
  Descend = 'По убыванию'
}

export const TypeOfSort = new Map([
  ['по цене', 'price'],
  ['по популярности', 'rating'],
]);

export const OrderOfSort = new Map([
  ['По возрастанию', 'asc'],
  ['По убыванию', 'desc'],
]);
