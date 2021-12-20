enum AppRoute {
  Catalog = '/',
  Guitar = '/guitars/:id',
  PageNotFound = '*',
}

enum APIRoute {
  Catalog = '/guitars',
}

export {AppRoute, APIRoute};
