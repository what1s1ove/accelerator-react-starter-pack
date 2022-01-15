import { createReducer } from '@reduxjs/toolkit';

import {
  SortTypeOptions,
  SortOrderOptions
} from '../../const';
import { Guitars } from '../../types/state';
import { changeSortOrder, changeSortType, setComments, setGuitars, setSearchString } from '../action';

export const initialState: Guitars = {
  guitars: [],
  sortType: SortTypeOptions.Default,
  sortOrder: SortOrderOptions.Default,
  searchString: '',
  commentsCount: {},
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
    })
    .addCase(setComments, (state, action) => {
      state.commentsCount = {...state.commentsCount, [action.payload.guitarId]: action.payload.comments.length};
    });
});

export {guitarsReducer};
