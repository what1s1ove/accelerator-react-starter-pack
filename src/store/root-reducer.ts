import { createReducer } from '@reduxjs/toolkit';
import { IGuitarsState } from '../types/IGuitars';
import { loadGuitars } from './guitars/action';

// import { combineReducers } from 'redux';
// import { guitarsReducer } from './guitars/reducer';


// export const rootReducer = combineReducers({
//   guitars: guitarsReducer,
// });

const initialState: IGuitarsState = {
  guitars: [],
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});
