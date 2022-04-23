import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchGuitarsList } from './store/guitars/api-actions';
import './index.css';

store.dispatch(fetchGuitarsList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
