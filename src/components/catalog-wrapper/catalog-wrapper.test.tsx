import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SortOrder, SortType } from '../../const';
import { makeFakeGuitars } from '../../utils/mocks';
import CatalogWrapper from './catalog-wrapper';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitars = makeFakeGuitars();

const store = mockStore({
  DATA: {catalog: guitars, guitarsCount: guitars.length, isDataLoaded: true, comments: []},
  SEARCH: {sortType: SortType.Unknown, sortOrder: SortOrder.Unknown},
});

store.dispatch = jest.fn();

describe('Component: CatalogWrapper', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogWrapper />
        </Router>
      </Provider>);

    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
});
