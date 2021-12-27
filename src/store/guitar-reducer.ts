import {createReducer} from '@reduxjs/toolkit';
import { State } from '../types/state';
import { fetchGuitars } from './actions';

const initialState: State = {
  guitars: [],
};

const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchGuitars, (state, action) => {
      const guitars = action.payload;

      state.guitars = guitars;
    });
});

export {guitarReducer};

