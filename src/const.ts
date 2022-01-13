const PRODUCTS_PER_PAGE = 9;
const PAGES_COUNT = 3;
const FIRST_PAGE = 1;
const ENTER_KEY = 'Enter';

enum AppRoute {
  Catalog = '/',
  Guitar = '/guitars/:id',
  PageNotFound = '*',
  Pagination = '/catalog/page_:pageNumber',
}

const APIRoute  = {
  Catalog: '/guitars',
  Comments: (id: number): string => `/guitars/${id}/comments`,
  FilterQuery: ((filterParams: string, sort: string, order: string, page: number): string => `/guitars${filterParams ? `${filterParams}` : '?'}${sort}${order}&_start=${(page - 1) * PRODUCTS_PER_PAGE}&_limit=${PRODUCTS_PER_PAGE}`),
  GuitarsCount:  ((filterParams: string): string => `/guitars${filterParams ? `${filterParams}` : '?'}`),
  CurrentGuitarComments: ((guitarId: number): string => `/guitars/${guitarId}/comments`),
};

const pageNavigationRoute = {
  PageNaviation: ((pageNumber: number, filterParams: string): string => `/catalog/page_${pageNumber}${filterParams ? `${filterParams}` : ''}`),
};

enum SortType {
  Price = '_sort=price',
  Rating = '_sort=rating',
  Unknown = '',
}

enum SortOrder {
  Asc = '&_order=asc',
  Desc = '&_order=desc',
  Unknown = '',
}

enum FilterParams {
  MinPrice = 'price_gte=',
  MaxPrice = 'price_lte=',
  Type = 'type=',
  FilterStringCount = 'stringCount=',
}

const stringValues = [4, 6, 7, 12];

enum FilterByType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

const filtersByStringAndType = [
  {
    elementId: '4-strings',
    value: 4,
    guitarTypes: [FilterByType.Electric.toString(), FilterByType.Ukulele.toString()],
  },
  {
    elementId: '6-strings',
    value: 6,
    guitarTypes: [FilterByType.Acoustic.toString(), FilterByType.Electric.toString()],
  },
  {
    elementId: '7-strings',
    value: 7,
    guitarTypes: [FilterByType.Acoustic.toString(), FilterByType.Electric.toString()],
  },
  {
    elementId: '12-strings',
    value: 12,
    guitarTypes: [FilterByType.Acoustic.toString()],
  },
];

enum stringLabels {
  fourStrings = 4,
  sixStrings = 6,
  sevenStrings = 7,
  twelveStrings = 12,
}

enum FetchStatus {
  Unset = 'Unset',
  InProgress = 'InProgress',
  Success = 'Success',
  Error = 'Error',
}

export {AppRoute, APIRoute, SortType, SortOrder, FilterParams, stringValues, filtersByStringAndType, pageNavigationRoute, PRODUCTS_PER_PAGE, PAGES_COUNT, FIRST_PAGE, stringLabels, ENTER_KEY, FetchStatus};
