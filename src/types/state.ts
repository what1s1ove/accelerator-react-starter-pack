import { SortOrderOptions, SortTypeOptions } from '../const';
import { RootState } from '../store/root-reducer';
import { Comment } from './comment';
import { Guitar } from './guitar';

export type Guitars = {
  guitars: Guitar[],
  sortType: SortTypeOptions,
  sortOrder: SortOrderOptions,
  searchString: string,
  commentsCount: {
    [id:number]: number,
  };
};

export type GuitarItem = {
  guitar: Guitar | undefined,
  comments: Comment[];
};

export type State = RootState;
