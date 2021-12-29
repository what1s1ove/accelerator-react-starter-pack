import { createReducer } from '@reduxjs/toolkit';
import { SortOrder, SortType } from '../../const';
import { SearchParameters } from '../../types/search';
import { setSortOrder, setSortType } from '../action';

const initialState: SearchParameters = {
  sortType: SortType.Unknown,
  sortOrder: SortOrder.Unknown,
};

const filtersData = createReducer(initialState, (builder) => {
  builder
    .addCase(setSortType, (state, action) => {
      const sortType = action.payload;
      state.sortType = sortType;
    })
    .addCase(setSortOrder, (state, action) => {
      const sortOrder = action.payload;
      state.sortOrder = sortOrder;
    });
});

export {filtersData};
