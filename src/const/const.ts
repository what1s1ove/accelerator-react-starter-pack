import {Type, ViewState} from '../components/catalog/catalog';

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
  FourStrings = '4',
  SixStrings = '6',
  SevenStrings = '7',
  TwelveStrings = '12',
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

export const stringifyCheckedTypeFilters = (items: string[]) => {
  if (items.length > 1) {
    return items.join('&type=');
  }
  return items.join('');
};

export const stringifyCheckedStringCountFilters = (items: string[]) => {
  if (items.length > 1) {
    return items.join('&stringCount=');
  }
  return  items.join('');
};

export const deleteUncheckedTypeFilter = (checkedTypeFilters: string[], filterItem: string) => {
  const index = checkedTypeFilters.findIndex((item) => item === filterItem);
  checkedTypeFilters = [
    ...checkedTypeFilters.slice(0, index),
    ...checkedTypeFilters.slice(index + 1),
  ];
  return checkedTypeFilters;
};

export const deleteUncheckedStringCountFilter = (checkedStringCountFilters:string[],stringCountItem:string) => {
  const index = checkedStringCountFilters.findIndex((item) => item === stringCountItem);
  checkedStringCountFilters = [
    ...checkedStringCountFilters.slice(0, index),
    ...checkedStringCountFilters.slice(index + 1),
  ];
  return checkedStringCountFilters;
};

export const isFourStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.FourStrings);
export const isSixStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.SixStrings);
export const isSevenStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.SevenStrings);
export const isTwelveStringsChecked = (viewState: ViewState) => viewState.stringCount?.includes(StringFilter.TwelveStrings);

export const isAcousticChecked = (viewState: ViewState) => viewState.type?.includes(TypeFilter.Acoustic);
export const isElectricChecked = (viewState: ViewState) => viewState.type?.includes(TypeFilter.Electric);
export const isUkuleleChecked = (viewState: ViewState) => viewState.type?.includes(TypeFilter.Ukulele);

export const isFourStringsDisabled = (stateType: Type):boolean => stateType.acoustic === TypeFilter.Acoustic && stateType.electric === '' && stateType.ukulele === '';
export const isSixStringsDisabled = (stateType: Type):boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
export const isSevenStringsDisabled = (stateType: Type):boolean => stateType.ukulele === TypeFilter.Ukulele && stateType.acoustic === '' && stateType.electric === '';
export const isTwelveStringsDisabled = (stateType: Type):boolean => (stateType.ukulele === TypeFilter.Ukulele || stateType.electric === TypeFilter.Electric) && stateType.acoustic === '';
