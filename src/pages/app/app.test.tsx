import App from './app';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockStore, getMockStore } from '../../helpers/get-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../constants/app-route';

describe('App pages:', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = getMockStore();
    store.dispatch = jest.fn();
  });
  test('Main page route works correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Home]}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Main page is not implemented')).toBeInTheDocument();
  });

  test('About page route works correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.About]}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('About page is not implemented')).toBeInTheDocument();
  });
});
