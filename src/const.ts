export enum AppRoute {
  Root = '/',
  Catalog = '/page-:pageNumber/:filters',
  GuitarPage = '/page-:pageNumber/:filters/:guitarId',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export const MONTHS = [
  'января',
  'февраля',
  'мара',
  'апреля',
  'мая',
  'июня',
  'июля',
  'авгуса',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
