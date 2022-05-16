/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGuitarsState } from '../../types/IGuitars';
import { fetchFilteredGuitarsList } from './api-actions';

export const initialState: IGuitarsState = {
  guitars: [],
  filteredGuitars: {
    data: [],
    currentRequestId: '',
    loading: 'idle',
  },
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
    // loadFilteredGuitars: (state, action) => {
    //   state.filteredGuitars = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredGuitarsList.pending, (state, action) => {
        if (state.filteredGuitars.loading === 'idle') {
          state.filteredGuitars.loading = 'pending';
          state.filteredGuitars.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchFilteredGuitarsList.fulfilled, (state, action: any) => {
        const { requestId } = action.meta;
        if (
          state.filteredGuitars.loading === 'pending' &&
          state.filteredGuitars.currentRequestId === requestId
        ) {
          state.filteredGuitars.loading = 'idle';
          state.filteredGuitars.data.push(action.payload);
          state.filteredGuitars.currentRequestId = '';
        }
      });
    // .addCase(fetchUserById.rejected, (state, action) => {
    //   const { requestId } = action.meta
    //   if (
    //     state.loading === 'pending' &&
    //     state.currentRequestId === requestId
    //   ) {
    //     state.loading = 'idle'
    //     state.error = action.error
    //     state.currentRequestId = undefined
    //   }
    // })
  },
});

export const { loadGuitars, loadGuitarsByName } = guitars.actions;
export default guitars.reducer;
