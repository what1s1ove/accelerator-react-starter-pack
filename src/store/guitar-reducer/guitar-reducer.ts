import { createReducer } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { updateGuitars, uploadGuitars } from '../actions';


const initialState: State = {
  guitars: [],
  sortedGuitars: [],
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
    });
});

export { guitarReducer };

