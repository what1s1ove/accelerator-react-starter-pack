import { createReducer } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { updateFilter, updateGuitars, uploadComments, uploadGuitars } from '../actions';

const initialState: State = {
  guitars: [],
  sortedGuitars: [],
  filterState: {
    type: [],
    strings: [],
    price: [],
    currentStrings: [],
    pagination: [],
  },
  comments: [],
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
    .addCase(updateFilter, (state, action) => {
      const filter = action.payload;

      state.filterState = filter;
    })
    .addCase(uploadComments, (state, action) => {
      const comments = action.payload;

      state.comments = comments;
    });
});

export { guitarReducer };

