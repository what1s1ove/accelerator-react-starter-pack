import { createReducer } from '@reduxjs/toolkit';

import { Error } from '../../types/state';
import { setErrorMessage } from '../action';

export const initialState: Error = {
  message: '',
};

const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setErrorMessage, (state, action) => {
      state.message = action.payload;
    });
});

export {errorReducer};
