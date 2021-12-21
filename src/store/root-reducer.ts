import {combineReducers} from '@reduxjs/toolkit';
import {mainData} from './main-data/main-data';

export enum NameSpace {
  main = 'MAIN'
}

export const rootReducer = combineReducers({
  [NameSpace.main]:mainData,
});

export type RootState = ReturnType<typeof rootReducer>;

