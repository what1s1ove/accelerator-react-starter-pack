enum AppRoute {
  Main = '/',
  Guitar = '/guitars/:id',
  AddComments = '/guitars/:id/comments',
}

enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

enum Coupons {
  light = 'light-333',
  medium = 'medium-444',
  height = 'height-555',
}

enum Sorts {
  byPrice = 'по цене',
  byPopular = 'по популярности',
}

export {
  AppRoute,
  APIRoute,
  Coupons,
  Sorts
};
