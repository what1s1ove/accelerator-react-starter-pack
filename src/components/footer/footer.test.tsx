import {createMemoryHistory} from 'history';
import {setupApiStore} from '../../service/test-utils';
import {mainAPI} from '../../service/api';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import Footer from './footer';

const history = createMemoryHistory();
const storeRef = setupApiStore(mainAPI);

describe('Component: Footer', () => {

  it('should render correctly', () => {
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <Route render={() => <Footer />}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская /i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/8-812-500-50-50/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
  });
});
