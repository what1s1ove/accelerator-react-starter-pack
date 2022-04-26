import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ThunkAppDispatch} from './store/action-type';
import {reducer} from './store/reducer';
import {fetchGuitarAction} from './store/api-action';
import {createAPI} from './services/api';
import {redirect} from './store/middleware/redirect';
import App from './components/app/app';

const api = createAPI(() => store);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch) (fetchGuitarAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
