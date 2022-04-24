import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars } from './action';
import { IGuitarsState } from '../../types/IGuitars';

const initialState: IGuitarsState = {
  guitars: [],
  guitarsByName: [],
};

export const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});
