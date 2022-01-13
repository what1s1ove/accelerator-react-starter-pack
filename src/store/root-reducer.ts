import {combineReducers} from 'redux';
import {guitarsData} from './guitars-data/guitars-data';
import {guitarsOtherData} from './guitars-other-data/guitars-other-data';

export enum NameSpace {
  guitars = 'GUITARS',
  guitarsOther = 'GUITARS_OTHER',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.guitarsOther]: guitarsOtherData,
});

export type RootState = ReturnType<typeof rootReducer>;
