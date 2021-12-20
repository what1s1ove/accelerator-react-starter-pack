enum AppRoute {
  Catalog = '/',
  Guitar = '/guitars/:id',
  PageNotFound = '*',
}

const APIRoute  = {
  Catalog: '/guitars',
  Comments: (id: number): string => `/guitars/${id}/comments`,
};

export {AppRoute, APIRoute};
