export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:id',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum SortTypeOptions {
  Popular = 'по популярности',
  Price = 'по цене',
}

export enum SortOrderOptions {
  Ascending = 'ascending',
  Descending = 'descending',
}

export enum GuitarsType {
  All = 'Все типы',
  Acoustic = 'Акустические гитары',
  Electric = 'Электрогитары',
  Ukulele = 'Укулеле',
}
