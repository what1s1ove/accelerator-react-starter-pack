import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {mainAPI} from '../service/api';

const rootReducer = combineReducers({
  [mainAPI.reducerPath]: mainAPI.reducer,
});

export const setUpStore = () => configureStore( {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
});
