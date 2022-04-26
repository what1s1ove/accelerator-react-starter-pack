import { createReducer } from '@reduxjs/toolkit';
import { IFilters } from '../../types/IFilters';
import { loadSortingOrder, loadSortingType } from './action';

const initialState: IFilters = {
  sortingOrder: '',
  sortingType: '',
};

export const filtersReducer = createReducer(initialState, (builer) => {
  builer
    .addCase(loadSortingType, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(loadSortingOrder, (state, action) => {
      state.sortingOrder = action.payload;
    });
});
