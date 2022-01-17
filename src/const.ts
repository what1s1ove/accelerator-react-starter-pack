export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:id',
  Product = '/product/:id',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum SortTypeOptions {
  Default = 'не применено',
  Popular = 'по популярности',
  Price = 'по цене',
}

export enum SortOrderOptions {
  Default = 'not applied',
  Ascending = 'ascending',
  Descending = 'descending',
}

export enum GuitarsType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export const strings = [4, 6, 7, 12];
