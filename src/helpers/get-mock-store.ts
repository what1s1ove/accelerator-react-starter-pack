import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../store/store';
import { initialState as guitarsInitialState } from '../store/guitars/reducer';
import { initialState as paginationInitialState } from '../store/pagination/reducer';
import { initialState as filtersInitialState } from '../store/filters/reducer';

export const mockStore = configureMockStore<RootState>();

export const getMockStore = () => mockStore({
  guitars: {...guitarsInitialState},
  filters: {...filtersInitialState},
  pagination: {...paginationInitialState},
});
