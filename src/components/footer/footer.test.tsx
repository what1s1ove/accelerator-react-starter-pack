import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Footer from './footer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>);

    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
  });
});
