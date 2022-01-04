import { createReducer } from '@reduxjs/toolkit';

import { GuitarItem } from '../../types/state';
import { getComments, getGuitar } from '../action';

export const initialState: GuitarItem = {
  guitar: undefined,
  comments: [],
};

const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(getComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {guitarReducer};
