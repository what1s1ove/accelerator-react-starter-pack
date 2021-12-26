import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {changeSortByTypeAction, changeSortByIncrease, fillGuitarsListAction} from '../action';

const initialState: MainData = {
  guitarsList: [],
  sortByType: '',
  sortByIncrease: '',
  isDataLoaded: false,
};

const mainData = createReducer( initialState, (builder) => {
  builder
    .addCase(fillGuitarsListAction, (state, action) => {
      state.guitarsList = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeSortByTypeAction, (state, action) => {
      state.sortByType = action.payload;
    })
    .addCase(changeSortByIncrease, (state, action) => {
      state.sortByIncrease = action.payload;
    });
});


export {mainData};
