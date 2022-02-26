import { createReducer } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { addGuitarToCart, deleteGuitarFromCart, updateFilter, updateGuitars, uploadComments, uploadGuitars } from '../actions';

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
  cart: [],
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
    })
    .addCase(addGuitarToCart, (state, action) => {
      const guitar = action.payload;

      state.cart = [...state.cart, guitar];
    })
    .addCase(deleteGuitarFromCart, (state, action) => {
      const guitar = action.payload;

      state.cart = state.cart.filter((guitarInCart) => guitarInCart.id !== guitar.id);
    });
});

export { guitarReducer };

