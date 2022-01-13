import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Comments} from '../../types/comment';
import {FilterPrice, FilterString, FilterType} from '../../types/guitar';

export const getCommentsCount = (state: State): number[] => state[NameSpace.guitarsOther].commentsCount;
export const getCurrentGuitarComments = (state: State): Comments => state[NameSpace.guitarsOther].currentGuitarComments;
export const getSortTitle = (state: State): string => state[NameSpace.guitarsOther].sortTitle;
export const getSortDirection = (state: State): string => state[NameSpace.guitarsOther].sortDirection;
export const getFilterPrice = (state: State): FilterPrice => state[NameSpace.guitarsOther].filterPrice;
export const getFilterType = (state: State): FilterType => state[NameSpace.guitarsOther].filterType;
export const getFilterString = (state: State): FilterString => state[NameSpace.guitarsOther].filterString;
