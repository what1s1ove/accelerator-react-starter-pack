import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import createAPI from './components/services/api';
import { fetchGuitarsAction } from './store/api-actions/api-actions';
import { guitarReducer } from './store/guitar-reducer/guitar-reducer';

const api = createAPI();

const store = configureStore({
  reducer: guitarReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchGuitarsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('wrapper'));
