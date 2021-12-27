import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data';
import { searchParameters } from './search-data';

enum NameSpace {
  Data = 'DATA',
  SearchParameters = 'SEARCH',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.SearchParameters]: searchParameters,
});

export {NameSpace, rootReducer};
export type RootState = ReturnType<typeof rootReducer>;
