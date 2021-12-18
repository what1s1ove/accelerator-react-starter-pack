import { combineReducers, configureStore } from '@reduxjs/toolkit';
import StoreSlice from 'constants/store-slice';
import createSagaMiddleware from 'redux-saga';
import catalogReducer from './catalog-slice/catalog-slice';
import rootSaga from './root-saga';

const rootReducer = combineReducers({
  [StoreSlice.Catalog]: catalogReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [ sagaMiddleware ],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>

export default store;
