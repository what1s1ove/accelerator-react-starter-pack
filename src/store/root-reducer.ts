import {combineReducers} from 'redux';
import {guitarsData} from './guitars-data/guitars-data';
import {guitarsOtherData} from './guitars-other-data/guitars-other-data';

export enum NameSpace {
  Guitars = 'GUITARS',
  GuitarsOther = 'GUITARS_OTHER',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData,
  [NameSpace.GuitarsOther]: guitarsOtherData,
});

export type RootState = ReturnType<typeof rootReducer>;
