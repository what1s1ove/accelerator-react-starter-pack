import { createReducer } from '@reduxjs/toolkit';

import {
  SortTypeOptions,
  SortOrderOptions
} from '../../const';
import { Guitars } from '../../types/state';
import { changeSortOrder, changeSortType, setGuitars } from '../action';

export const initialState: Guitars = {
  guitars: [],
  sortType: SortTypeOptions.Price,
  sortOrder: SortOrderOptions.Ascending,
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
    });
});

export {guitarsReducer};
