/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { IPagination } from '../../types/IPagination';
import { loadFilteredGuitars } from '../guitars/slice';

export const initialState: IPagination = {
  currentPage: 1,
  totalPageCount: 1,
};

const pagination = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    loadCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    loadTotalPageCount: (state, action) => {
      console.log('state: ', state);
      state.totalPageCount = action.payload;
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(loadFilteredGuitars, (state, action) => {
  //     console.log('action.payload: ', action.payload);
  //     console.log('state: ', state);
  //     state.totalPageCount = action.payload.totalPageCount;
  //   });
  // },
});

export const { loadCurrentPage, loadTotalPageCount } = pagination.actions;
export default pagination.reducer;
