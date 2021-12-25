import {State} from '../../types/state';
import {GuitarsList} from '../../types/guitar';
import {NameSpace} from '../root-reducer';
import {Sort} from '../../types/sort';

export const getGuitarsList = (state:State): GuitarsList => state[NameSpace.main].guitarsList;
export const getSortByType = (state: State):Sort => state[NameSpace.main].sortByType;
export const getSortByIncrease = (state: State):Sort => state[NameSpace.main].sortByIncrease;
