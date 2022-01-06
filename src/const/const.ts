export const INITIAL_GUITARS_COUNT = 9;
export const QUERY_MIN_PRICE  = 'price_gte';
export const QUERY_MAX_PRICE = 'price_lte';

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

export const getSort = (sort:string):string => SortByType.get(sort) as string;

export const getOrder = (order:string): string => SortByOrder.get(order) as string;

export const parseViewState = (urlQueryParams: string) => {
  const viewState = new URLSearchParams(urlQueryParams).entries();
  return Object.fromEntries(viewState);
};

export const stringifyViewState = (viewState: {[p: string]: string}) => new URLSearchParams(viewState).toString();

export const getURL = (type:string | undefined, stringCount:string | undefined):string => {
  if (type && stringCount === undefined) {
    return `/guitars?type=${type}`;
  }
  else if (stringCount && type === undefined) {
    return `/guitars?stringCount=${stringCount}`;
  }
  else if (type && stringCount) {
    return `/guitars?type=${type}&stringCount=${stringCount}`;
  }
  else {
    return '/guitars';
  }
};


