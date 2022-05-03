export const AppRoutes = {
  About: '/about',
  Address: '/address',
  getCatalog: (pageNumber = ':page') => `/catalog/page_${pageNumber}`,
  Home: '/',
  Basket: '/basket',
};
