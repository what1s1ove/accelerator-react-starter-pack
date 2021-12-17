import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data';

enum NameSpace {
  Data = 'DATA',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
});

export {NameSpace, rootReducer};
export type RootState = ReturnType<typeof rootReducer>;
