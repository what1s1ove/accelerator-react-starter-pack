import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import App from './app';
import {mainAPI} from '../../service/api';
import {setupApiStore} from '../../service/test-utils';

const history = createMemoryHistory();
const storeRef = setupApiStore(mainAPI);

describe('App Routing', () => {
  it('should render correctly',  () => {
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Где купить?/i).length).toBe(2);
    expect(screen.getByText(/О Компании?/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });

  it('should render 404 page when route is not exist', () => {
    history.push('/non-exist');
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});
