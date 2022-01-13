import {datatype, image, name, random} from 'faker';
import {Guitar} from '../types/guitar';

export const makeFakeGuitar = () => ({
  id: datatype.number(50),
  name: name.title(),
  vendorCode: name.title(),
  type: random.word(),
  description: datatype.string(10),
  previewImg: image.image(),
  stringCount: datatype.number(12),
  rating: datatype.number(5),
  price: datatype.number(100),
});

export const makeFakeGuitarsList = (value: number): Guitar[] => new Array(value).fill(null).map(() => makeFakeGuitar());
