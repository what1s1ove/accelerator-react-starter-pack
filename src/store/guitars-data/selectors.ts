import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Guitars, Guitar} from '../../types/guitar';

export const getGuitars = (state: State): Guitars => state[NameSpace.guitars].guitars;
export const getCurrentGuitar = (state: State): Guitar => state[NameSpace.guitars].currentGuitar;
export const getGuitarsRating = (state: State): number[] => state[NameSpace.guitars].guitarsRating;
export const getPage = (state: State): number => state[NameSpace.guitars].page;
