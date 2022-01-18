import { createReducer } from '@reduxjs/toolkit';
import { Cart } from '../../types/state';
import { closeModal, openModal } from '../action';

export const initialState: Cart = {
  modal: null,
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openModal, (state, action) => {
      state.modal = action.payload;
    })
    .addCase(closeModal, (state, action) => {
      state.modal = action.payload;
    });
});

export {orderReducer};
