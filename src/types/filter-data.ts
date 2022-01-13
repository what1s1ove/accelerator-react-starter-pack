import { GuitarsType } from '../const';

export type FilterData = {
  priceFrom: number,
  priceTo: number,
  typeGuitars: GuitarsType[],
  numberStrings: number[],
};
