import { SortOrderOptions, SortTypeOptions } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getGuitarsList = (state: State): Guitar[] => state[NameSpace.Guitars].guitars.slice();
export const getSortType = (state: State): SortTypeOptions => state[NameSpace.Guitars].sortType;
export const getSortOrder = (state: State): SortOrderOptions => state[NameSpace.Guitars].sortOrder;
