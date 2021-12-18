import { createReducer } from '@reduxjs/toolkit';
import { GuitarType } from '../types/guitar';
import { loadGuitars } from './action';

type CatalogType = {
  catalog: GuitarType[];
  isDataLoaded: boolean,
}

const initialState: CatalogType = {
  catalog: [
    {
      id: 0,
      name: '',
      vendorCode: '',
      type: '',
      description: '',
      previewImg: '',
      stringCount: 0,
      rating: 0,
      price: 0,
    },
  ],
  isDataLoaded: true,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.catalog = action.payload.guitars;
    });
});

export {guitarData};

