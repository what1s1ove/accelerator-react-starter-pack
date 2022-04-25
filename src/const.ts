enum AppRoute {
  Main = '/',
  Film = '/guitars/:id',
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

export {
  AppRoute,
  APIRoute,
  Coupons
};
