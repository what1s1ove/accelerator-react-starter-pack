export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatNumber = (number: number): string =>
  new Intl.NumberFormat('ru-RU').format(number);
