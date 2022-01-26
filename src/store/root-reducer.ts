import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { filtersData } from './filters-data/filters-data';
import { paginationData } from './pagination-data/pagination-data';

enum NameSpace {
  Data = 'DATA',
  SearchParameters = 'SEARCH',
  Pagination = 'PAGINATION',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.SearchParameters]: filtersData,
  [NameSpace.Pagination]: paginationData,
});

export {NameSpace, rootReducer};
export type RootState = ReturnType<typeof rootReducer>;
