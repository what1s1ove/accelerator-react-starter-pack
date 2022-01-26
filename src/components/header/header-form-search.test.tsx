/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SortOrder, SortType } from '../../const';
import { makeFakeGuitars } from '../../utils/mocks';
import HeaderFormSearch from './header-form-search';

const mockStore = configureMockStore();
const guitars = makeFakeGuitars();

const store = mockStore({
  DATA: {catalog: guitars, guitarsCount: 0, isDataLoaded: true},
});

store.dispatch = jest.fn();
const history = createMemoryHistory();

describe('Component: HeaderFormSearch', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderFormSearch />
        </Router>
      </Provider>);

    expect(screen.getByText('Поиск')).toBeInTheDocument();
    expect(screen.getByText('Начать поиск')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('search'), 'Честер');
    expect(screen.getByDisplayValue(/Честер/i)).toBeInTheDocument();
  });
});
