import { createReducer } from '@reduxjs/toolkit';
import { setGuitarsCount } from '../action';

type Pagination = {
  guitarsCount: number,
};

const initialState: Pagination = {
  guitarsCount: 0,
};

const paginationData = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarsCount, (state, action) => {
      const { guitarsCount } = action.payload;
      state.guitarsCount = guitarsCount;
    });
});

export { paginationData };
