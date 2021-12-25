enum AppRoute {
  Catalog = '/',
  Guitar = '/guitars/:id',
  PageNotFound = '*',
  Filter = '/guitars',
}

const APIRoute  = {
  Catalog: '/guitars',
  Comments: (id: number): string => `/guitars/${id}/comments`,
  Sort: ((filterQuery: string, sortType: string, sortOrder?: string): string => `/guitars${filterQuery ? `${filterQuery}&` : '?'}${sortType}${sortOrder ? sortOrder : ''}`),
  Filter: ((query: string): string => `/guitars${query}`),
};

enum SortType {
  Price = '_sort=price',
  Rating = '_sort=rating',
}

enum SortOrder {
  Asc = '&_order=asc',
  Desc = '&_order=desc',
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

export {AppRoute, APIRoute, SortType, SortOrder, FilterParams, stringValues, filtersByStringAndType};
