export const ApiRoute = {
  Guitars: '/guitars',
  getGuitarById: (id = ':id') => `/guitars/${id}`,
  Comments: '/comments',
  Coupons: '/coupons',
  Orders: '/orders',
} as const;
