import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {fillGuitarsList} from '../action';

const initialState: MainData = {
  guitarsList: [],
  isDataLoaded: false,
};

const mainData = createReducer( initialState, (builder) => {
  builder
    .addCase(fillGuitarsList, (state, action) => {
      state.guitarsList = action.payload;
      state.isDataLoaded = true;
    });
});


export {mainData};
