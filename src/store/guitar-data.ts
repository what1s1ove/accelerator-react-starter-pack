import { createReducer } from '@reduxjs/toolkit';
import { GuitarType } from '../types/guitar';
import { loadGuitars, loadGuitarsCount } from './action';

type CatalogType = {
  catalog: GuitarType[];
  isDataLoaded: boolean,
  guitarsCount: number,
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
  isDataLoaded: false,
  guitarsCount: 0,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.catalog = action.payload.guitars;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      const {guitars} = action.payload;
      const guitarsCount = guitars.length;
      state.guitarsCount = guitarsCount;
    });
});

export {guitarData};

