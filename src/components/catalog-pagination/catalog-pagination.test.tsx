import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { SortOrder, SortType } from '../../const';
import { makeFakeGuitars } from '../../utils/mocks';
import CatalogPagination from './catalog-pagination';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitars = makeFakeGuitars();

const store = mockStore({
  DATA: {catalog: guitars, guitarsCount: guitars.length, isDataLoaded: true},
  SEARCH: {sortType: SortType.Unknown, sortOrder: SortOrder.Unknown},
});

store.dispatch = jest.fn();

describe('Component: CatalogPagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogPagination />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should redirect to /catalog/page_:pageNumber when user clicks the link', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/catalog/page_2" exact>
              <h1>This is page 2</h1>
            </Route>
            <Route>
              <CatalogPagination />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is page 2/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/2/i));
    expect(screen.getByText(/This is page 2/i)).toBeInTheDocument();
  });
});
