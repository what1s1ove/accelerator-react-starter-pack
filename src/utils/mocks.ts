import { datatype, date, image, lorem, name, vehicle } from 'faker';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';

const GUITARS_COUNT = 37;

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

export const makeFakeComment = (): CommentType => ({
  id: datatype.string(),
  userName: name.firstName(),
  advantage: lorem.text(),
  disadvantage: lorem.text(),
  comment: lorem.text(),
  rating: datatype.number(),
  createAt: date.past(),
  guitarId: datatype.number(),
} as CommentType);

export const makeFakeComments = (): CommentType[] => {
  const comments = [];
  for (let i = 0; i < GUITARS_COUNT; i++) {
    comments.push(makeFakeComment());
  }
  return comments;
};
