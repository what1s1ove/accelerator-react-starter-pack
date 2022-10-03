export const AppRoute = {
  About: '/about',
  Address: '/address',
  getCatalog: (pageNumber = ':page') => `/catalog/page_${pageNumber}`,
  getGuitar: (id = ':id') => `/guitars/${id}`,
  Home: '/',
  Basket: '/basket',
} as const;
