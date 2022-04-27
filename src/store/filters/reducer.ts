/* eslint-disable no-console */
import { createReducer } from '@reduxjs/toolkit';
import { IFilters } from '../../types/IFilters';
import { loadGuitarType, loadQuantityOfStrings, loadSortingOrder, loadSortingType, removeGuitarType, removeQuantityOfStrings } from './action';

const initialState: IFilters = {
  sortingOrder: '',
  sortingType: '',
  quantityOfStrings: [],
  guitarType: [],
};

export const filtersReducer = createReducer(initialState, (builer) => {
  builer
    .addCase(loadSortingType, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(loadSortingOrder, (state, action) => {
      state.sortingOrder = action.payload;
    })
    .addCase(loadQuantityOfStrings, (state, action) => {
      state.quantityOfStrings.push(action.payload);
    })
    .addCase(removeQuantityOfStrings, (state, action) => {
      state.quantityOfStrings = state.quantityOfStrings.filter((item) => item !== action.payload);
    })
    .addCase(loadGuitarType, (state, action) => {
      state.guitarType.push(action.payload);
    })
    .addCase(removeGuitarType, (state, action) => {
      state.guitarType = state.guitarType.filter((item) => item !== action.payload);
    });
});
