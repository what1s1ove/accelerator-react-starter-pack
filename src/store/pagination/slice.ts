import { createSlice } from '@reduxjs/toolkit';
import { IPagination } from '../../types/IPagination';

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
      state.totalPageCount = action.payload;
    },
  },
});

export const { loadCurrentPage, loadTotalPageCount } = pagination.actions;
export default pagination.reducer;
