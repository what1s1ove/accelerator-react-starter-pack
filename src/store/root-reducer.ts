import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { filtersData } from './filters-data/filters-data';
import { pagePagination } from './filters-data/page-pagination';

enum NameSpace {
  Data = 'DATA',
  SearchParameters = 'SEARCH',
  Pagination = 'Pagination',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.SearchParameters]: filtersData,
  [NameSpace.Pagination]: pagePagination,
});

export {NameSpace, rootReducer};
export type RootState = ReturnType<typeof rootReducer>;
