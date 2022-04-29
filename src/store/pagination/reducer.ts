import { createReducer } from '@reduxjs/toolkit';
import { IPagination } from '../../types/IPagination';
import { loadFilteredGuitars } from '../guitars/action';
import { loadTotalPageCount, loadCurrentPage } from './action';

const initialState: IPagination = {
  currentPage: 1,
  totalPageCount: 1,
};

export const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(loadTotalPageCount, (state, action) => {
      state.totalPageCount = action.payload;
    })
    .addCase(loadFilteredGuitars, (state, action) => {
      state.totalPageCount = action.payload.totalPageCount;
    });
});
