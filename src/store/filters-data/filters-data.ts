import { createReducer } from '@reduxjs/toolkit';
import { DefaultPriceRange } from '../../const';
import { setPriceRangeMax, setPriceRangeMin } from '../action';

type CatalogFilter = {
  priceRangeMin: number,
  priceRangeMax: number,
};

const initialState: CatalogFilter = {
  priceRangeMin: DefaultPriceRange.Min,
  priceRangeMax: DefaultPriceRange.Max,
};

const filtersData = createReducer(initialState, (builder) => {
  builder
    .addCase(setPriceRangeMin, (state, action) => {
      const { priceRangeMin } = action.payload;
      state.priceRangeMin = priceRangeMin;
    })
    .addCase(setPriceRangeMax, (state, action) => {
      const { priceRangeMax } = action.payload;
      state.priceRangeMax = priceRangeMax;
    });
});

export {filtersData};
