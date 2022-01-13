import {setupApiStore} from '../../service/test-utils';
import {mainAPI, useFetchGuitarsListQuery} from '../../service/api';
import {render, screen} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import Catalog from './catalog';
import fetchMock from 'jest-fetch-mock';
import {makeFakeGuitarsList} from '../../mocks/mocks';
import {renderHook} from '@testing-library/react-hooks';
import {Guitar} from '../../types/guitar';
import {ReactNode} from 'react';

beforeEach((): void => {
  fetchMock.resetMocks();
});

type ProviderProps = {
  children: ReactNode;
}

const wrapper = ({children}:ProviderProps):JSX.Element => <Provider store={storeRef.store}>{children}</Provider>;
const storeRef = setupApiStore(mainAPI);
const history = createMemoryHistory();

describe('Component: Catalog', () => {
  it('useFetchGuitarsListQuery should work correctly', async () => {
    const fakeResponse:Guitar[] = makeFakeGuitarsList(1);

    const args = {
      limit: 1,
      sort: undefined,
      order: undefined,
      type: undefined,
      stringCount: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      page: undefined,
    };

    fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));
    const {result, waitForNextUpdate} = renderHook(() => useFetchGuitarsListQuery(args), {wrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentData).toBe(undefined);

    await waitForNextUpdate({timeout: 5000});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentData).toStrictEqual(fakeResponse);
  });

  it('should render correctly',() => {
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <Route render={() => <Catalog />}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });
});
