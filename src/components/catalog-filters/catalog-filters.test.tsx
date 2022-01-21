/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeGuitars } from '../../utils/mocks';
import { SortOrder, SortType } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CatalogFilters from './catalog-filters';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitars = makeFakeGuitars();

describe('Component: CatalogFilter', () => {
  // it('should render correctly', () => {
  //   const store = mockStore({
  //     DATA: {catalog: guitars, guitarsCount: guitars.length, isDataLoaded: true},
  //     SEARCH: {sortType: SortType.Unknown, sortOrder: SortOrder.Unknown},
  //   });
  //   store.dispatch = jest.fn();

  //   render(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <CatalogFilters />
  //       </Router>
  //     </Provider>,
  //   );

  //   expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Акустические гитары/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Электрогитары/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Укулеле/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/4/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/6/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/7/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/12/i)).toBeInTheDocument();

  //   userEvent.type(screen.getByTestId('minPrice'), '2000');
  //   expect(screen.getByDisplayValue(/2000/i)).toBeInTheDocument();

  //   userEvent.type(screen.getByTestId('maxPrice'), '10000');
  //   expect(screen.getByDisplayValue(/10000/i)).toBeInTheDocument();
  // });
});
