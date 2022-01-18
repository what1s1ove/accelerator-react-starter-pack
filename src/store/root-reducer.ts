import { combineReducers } from 'redux';
import { errorReducer } from './error/error-reducer';
import { guitarReducer } from './guitar/guitar-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
  Error = 'ERROR',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsReducer,
  [NameSpace.Guitar]: guitarReducer,
  [NameSpace.Error]: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
