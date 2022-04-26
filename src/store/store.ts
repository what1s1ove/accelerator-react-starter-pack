import { configureStore } from '@reduxjs/toolkit';
import { axiosInstance } from '../api/api';
import { filtersReducer } from './filters/reducer';
import { guitarsReducer } from './guitars/reducer';

export const store = configureStore({
  reducer: {
    guitars: guitarsReducer,
    filters: filtersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axiosInstance,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
