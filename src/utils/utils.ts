import { GuitarsType } from '../const';

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatNumber = (number: number | undefined): string =>
  number ? new Intl.NumberFormat('ru-RU').format(number) : '';

export const parseFormattedNumber = (number: string): number =>
  parseInt(number.replace(' ', ''), 10);

export const toggleArrayElement = <T>(arry: T[], value: T): T[] => {
  if (arry.includes(value)) {
    return arry.filter((el) => el !== value);
  } else {
    return [...arry, value];
  }
};

export const translateTypeGuitars = (type: string): string => {
  switch(type) {
    case GuitarsType.Acoustic:
      return 'Акустическая гитара';
    case GuitarsType.Electric:
      return 'Электрогитара';
    case GuitarsType.Ukulele:
      return 'Укулеле';
    default:
      return 'Неизвестно';
  }
};
