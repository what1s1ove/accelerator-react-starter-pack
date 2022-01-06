import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { changeFilter, filterGuitars, updateGuitars, uploadGuitars } from './actions';


const initialState: State = {
  guitars: [],
  sortedGuitars: [],
  filteredGuitars: [],
  filter: {
    acoustic: false,
    electric: false,
    ukulele: false,
    fourStrings: false,
    sixStrings: false,
    sevenStrings: false,
    twelveStrings: false,
  },
};

const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(uploadGuitars, (state, action) => {
      const guitars = action.payload;

      state.guitars = guitars;
    })
    .addCase(updateGuitars, (state, action) => {
      const guitars = action.payload;

      state.sortedGuitars = guitars;
    })
    .addCase(filterGuitars, (state, action) => {
      const guitars = action.payload;

      state.filteredGuitars = guitars;
    })
    .addCase(changeFilter, (state, action) => {
      const filter = action.payload;

      state.filter = filter;
    });
});

export { guitarReducer };

