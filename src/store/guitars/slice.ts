import { createSlice } from '@reduxjs/toolkit';
import { IGuitarsState } from '../../types/IGuitars';

export const initialState: IGuitarsState = {
  guitars: [],
  filteredGuitars: [],
  guitarsByName: [],
};

const guitars = createSlice({
  name: 'guitars',
  initialState: initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    loadGuitarsByName: (state, action) => {
      state.guitarsByName = action.payload;
    },
    loadFilteredGuitars: (state, action) => {
      state.filteredGuitars = action.payload;
    },
  },
});

export const { loadGuitars, loadFilteredGuitars, loadGuitarsByName } = guitars.actions;
export default guitars.reducer;
