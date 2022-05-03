import { Catalog } from './catalog';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockStore, getMockStore } from '../../helpers/get-mock-store';
import { Provider } from 'react-redux';
import { AppRoutes } from '../../constants/app-routes';

describe('App pages:', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = getMockStore();
    store.dispatch = jest.fn();
  });
  test('Catalog page route works correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoutes.getCatalog('1')]}>
          <Catalog />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });
});
