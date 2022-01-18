import { GuitarsType, SortOrderOptions, SortTypeOptions } from '../const';
import { RootState } from '../store/root-reducer';
import { Comment } from './comment';
import { Guitar } from './guitar';

export type Guitars = {
  guitars: Guitar[],
  filteredGuitars: Guitar[],
  sortType: SortTypeOptions,
  sortOrder: SortOrderOptions,
  searchString: string | undefined,
  priceFrom: number | undefined,
  priceTo: number | undefined,
  pageNumber: number,
  pageCount: number,
  typeGuitars: GuitarsType[],
  numberStrings: number[],
};

export type GuitarItem = {
  guitar: Guitar | undefined,
  comments: Comment[],
};

export type Error = {
  message: string,
};

export type Cart = {
  modal: Guitar | null,
};

export type State = RootState;
