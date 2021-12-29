import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute, SortOrder, SortType } from '../../const';
import { makeFakeGuitars } from '../../utils/mocks';
import App from './app';

const mockStore = configureMockStore();
const guitars = makeFakeGuitars();

const store = mockStore({
  DATA: {catalog: guitars, guitarsCount: 0, isDataLoaded: true,  comments: []},
  SEARCH: {sortType: SortType.Unknown, sortOrder: SortOrder.Unknown},
});

store.dispatch = jest.fn();

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Catalog" when user navigate to "/"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "Pagination" when user navigate to "/catalog/page_:pageNumber"', () => {
    history.push(AppRoute.Pagination);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "PageNotFound" when user navigates to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
