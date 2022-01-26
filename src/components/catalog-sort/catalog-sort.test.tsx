/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SortOrder, SortType } from '../../const';
import CatalogSort from './catalog-sort';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({});

store.dispatch = jest.fn();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogSort />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
