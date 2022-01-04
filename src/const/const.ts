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

export const SortByType = new Map([
  ['по цене', 'price'],
  ['по популярности', 'rating'],
]);

export const SortByOrder = new Map([
  ['По возрастанию', 'asc'],
  ['По убыванию', 'desc'],
]);

export enum TypeFilter {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringFilter {
  FourStrings = '4-strings',
  SixStrings = '6-strings',
  SevenStrings = '7-strings',
  TwelveStrings = '12-strings',
}
