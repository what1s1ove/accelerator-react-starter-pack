import { createSlice } from '@reduxjs/toolkit';
import { IFilters } from '../../types/IFilters';

export const initialState: IFilters = {
  sortingOrder: '',
  sortingType: '',
  quantityOfStrings: [],
  guitarType: [],
  priceRange: {min: 0, max: 0},
};

const filters = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    loadSortingType: (state, action) => {
      state.sortingType = action.payload;
    },
    loadSortingOrder: (state, action) => {
      state.sortingOrder = action.payload;
    },
    loadQuantityOfStrings: (state, action) => {
      state.quantityOfStrings.push(action.payload);
    },
    removeQuantityOfStrings: (state, action) => {
      state.quantityOfStrings = state.quantityOfStrings.filter((item) => item !== action.payload);
    },
    loadGuitarType: (state, action) => {
      state.guitarType.push(action.payload);
    },
    removeGuitarType: (state, action) => {
      state.guitarType = state.guitarType.filter((item) => item !== action.payload);
    },
    loadGuitarsPriceRange: (state, action) => {
      state.priceRange = {...action.payload};
    },
  },
});

export const {
  loadGuitarsPriceRange, loadGuitarType, loadQuantityOfStrings,
  loadSortingOrder, loadSortingType, removeGuitarType, removeQuantityOfStrings,
} = filters.actions;

export default filters.reducer;
