enum AppRoute {
  Catalog = '/',
  Guitar = '/guitars/:id',
  PageNotFound = '*',
}

const APIRoute  = {
  Catalog: '/guitars',
  Comments: (id: number): string => `/guitars/${id}/comments`,
  Sort: (sort: string, order: string): string => `/guitars?_sort=${sort}&_order=${order}`,
};

enum SortType {
  Price = 'price',
  Rating = 'rating',
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export {AppRoute, APIRoute, SortType, SortOrder};
