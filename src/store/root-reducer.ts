import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { filtersData } from './filters-data/filters-data';

enum NameSpace {
  Data = 'DATA',
  SearchParameters = 'SEARCH',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.SearchParameters]: filtersData,
});

export {NameSpace, rootReducer};
export type RootState = ReturnType<typeof rootReducer>;
