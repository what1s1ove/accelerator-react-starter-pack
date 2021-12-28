import { datatype, image, lorem, name, vehicle } from 'faker';
import { GuitarType } from '../types/guitar';

const GUITARS_COUNT = 17;

export const makeFakeGuitar = (): GuitarType => ({
  id: datatype.number(),
  name: name.firstName(),
  vendorCode: vehicle.vehicle(),
  type: vehicle.type(),
  description: lorem.text(),
  previewImg: image.image(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
} as GuitarType);

export const makeFakeGuitars = (): GuitarType[] => {
  const guitars = [];

  for (let i = 0; i < GUITARS_COUNT; i++) {
    guitars.push(makeFakeGuitar());
  }

  return guitars;
};
