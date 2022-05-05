import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../store/store';
import { initialState as guitarsInitialState } from '../store/guitars/slice';
import { initialState as paginationInitialState } from '../store/pagination/slice';
import { initialState as filtersInitialState } from '../store/filters/slice';

export const mockStore = configureMockStore<RootState>();

export const getMockStore = () => mockStore({
  guitars: {...guitarsInitialState},
  filters: {...filtersInitialState},
  pagination: {...paginationInitialState},
});
