import { createReducer } from '@reduxjs/toolkit';

import {
  SortTypeOptions,
  SortOrderOptions
} from '../../const';
import { Guitars } from '../../types/state';
import { changeSortOrder, changeSortType, setGuitars, setSearchString } from '../action';

export const initialState: Guitars = {
  guitars: [],
  sortType: SortTypeOptions.Default,
  sortOrder: SortOrderOptions.Default,
  searchString: '',
};

const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(changeSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(setSearchString, (state, action) => {
      state.searchString = action.payload;
    });
});

export {guitarsReducer};
