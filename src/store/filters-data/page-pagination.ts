import { createReducer } from '@reduxjs/toolkit';
import { setGuitarsCount } from '../action';

type PagePagination = {
  guitarsCount: number,
};

const initialState: PagePagination = {
  guitarsCount: 0,
};

const pagePagination = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarsCount, (state, action) => {
      const { guitarsCount } = action.payload;
      state.guitarsCount = guitarsCount;
    });
});

export { pagePagination };
