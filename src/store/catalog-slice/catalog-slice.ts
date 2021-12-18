import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StoreSlice from 'constants/store-slice';
import ICatalogState, { LoadGuitarSuccessType } from './catalog-types';

const initialState: ICatalogState = {
  guitars: [],
  guitarsLoading: false,
};

const catalogSlice = createSlice({
  name: StoreSlice.Catalog,
  initialState,
  reducers: {
    loadGuitars(state) {
      state.guitarsLoading = true;
    },
    loadGuitarsSuccess(state, action: PayloadAction<LoadGuitarSuccessType>) {
      state.guitars = action.payload.guitars;
      state.guitarsLoading = false;
    },
    loadGuitarsFail(state) {
      state.guitarsLoading = false;
    },
  },
});

const catalogReducer = catalogSlice.reducer;

export const {
  loadGuitars,
  loadGuitarsSuccess,
  loadGuitarsFail,
} = catalogSlice.actions;
export default catalogReducer;
