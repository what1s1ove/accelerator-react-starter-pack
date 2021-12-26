import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {fillGuitarsListAction} from '../action';

const initialState: MainData = {
  guitarsList: [],
  isDataLoaded: false,
};

const mainData = createReducer( initialState, (builder) => {
  builder
    .addCase(fillGuitarsListAction, (state, action) => {
      state.guitarsList = action.payload;
      state.isDataLoaded = true;
    });
});


export {mainData};
