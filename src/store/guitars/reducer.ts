import { createReducer } from '@reduxjs/toolkit';
import { loadFilteredGuitars, loadGuitars, loadGuitarsByName } from './action';
import { IGuitarsState } from '../../types/IGuitars';

export const initialState: IGuitarsState = {
  guitars: [],
  filteredGuitars: [],
  guitarsByName: [],
};

export const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadFilteredGuitars, (state, action) => {
      state.filteredGuitars = action.payload.filteredGuitars;
    })
    .addCase(loadGuitarsByName, (state, action) => {
      state.guitarsByName = action.payload;
    });
});
