import { combineReducers } from 'redux';
import { guitarReducer } from './guitar/guitar-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsReducer,
  [NameSpace.Guitar]: guitarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
