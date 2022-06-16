import { loadGuitars, loadGuitarsByName } from './slice';
import { ApiRoute } from '../../constants/api-route';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParametersType } from '../../types/query-params';
import { QueryParam } from '../../constants/query-param';
import { loadTotalPageCount } from '../pagination/slice';
import { axiosInstance } from '../../api/api';
import { IFilters } from '../../types/IFilters';
import { IPagination } from '../../types/IPagination';
import { ActionType } from '../../constants/action-type';
import { IGuitarsState } from '../../types/IGuitars';

const GUITARS_PER_PAGE = 9;
const TotalCountHeader = 'x-total-count';
const EmbedComments = 'comments';

export const fetchGuitarsList = createAsyncThunk(
  ActionType.FETCH_GUITARS,
  async (_, thunkApi) => {
    const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`);
    thunkApi.dispatch(loadGuitars(response.data));
  },
);

export const fetchFilteredGuitarsList = createAsyncThunk<Promise<void>, QueryParametersType, {state: {filters: IFilters, pagination: IPagination, guitars: IGuitarsState}}>(
  ActionType.FETCH_FILTERED_GUITARS,
  async (params: QueryParametersType, {getState, dispatch}) => {
    const {loading} = getState().guitars.filteredGuitars;
    if (loading !== 'pending') {
      return;
    }

    const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`, {
      params: {
        [QueryParam.StringCount]: getState().filters.quantityOfStrings,
        [QueryParam.Type]: getState().filters.guitarType,
        [QueryParam.PriceGte]: getState().filters.priceRange.min || null,
        [QueryParam.PriceLte]: getState().filters.priceRange.max || null,
        [QueryParam.Limit]: GUITARS_PER_PAGE,
        [QueryParam.Start]: GUITARS_PER_PAGE * (getState().pagination.currentPage - 1),
        [QueryParam.Embed]: EmbedComments,
        ...params,
      },
    });

    const allPages = Math.ceil(response.headers[TotalCountHeader] / GUITARS_PER_PAGE);
    dispatch(loadTotalPageCount(allPages));

    return response.data;

    // thunkApi.dispatch(loadTotalPageCount(allPages));
    // thunkApi.dispatch(loadFilteredGuitars(response.data));
  },
);

export const fetchGuitarsListByName = createAsyncThunk(
  ActionType.FETCH_GUITARS_BY_NAME,
  async (name: string, thunkAPI) => {
    const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`, {
      params: {
        [QueryParam.NameLike]: name,
      },
    });

    thunkAPI.dispatch(loadGuitarsByName(response.data));
  },
);
