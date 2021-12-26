import {State} from '../../types/state';
import {GuitarsList} from '../../types/guitar';
import {NameSpace} from '../root-reducer';

export const getGuitarsList = (state:State): GuitarsList => state[NameSpace.main].guitarsList;
