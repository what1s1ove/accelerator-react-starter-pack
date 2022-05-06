import { loadFilteredGuitars, loadGuitars, loadGuitarsByName } from './slice';
import { ApiRoute } from '../../constants/api-route';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParametersType } from '../../types/query-params';
import { QueryParam } from '../../constants/query-param';
import { loadTotalPageCount } from '../pagination/slice';
import { axiosInstance } from '../../api/api';
import { IFilters } from '../../types/IFilters';
import { IPagination } from '../../types/IPagination';
import { ActionType } from '../../constants/action-type';

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

export const fetchFilteredGuitarsList = createAsyncThunk<Promise<void>, QueryParametersType, {state: {filters: IFilters, pagination: IPagination}}>(
  ActionType.FETCH_FILTERED_GUITARS,
  async (params: QueryParametersType, thunkApi) => {
    const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`, {
      params: {
        [QueryParam.StringCount]: thunkApi.getState().filters.quantityOfStrings,
        [QueryParam.Type]: thunkApi.getState().filters.guitarType,
        [QueryParam.PriceGte]: thunkApi.getState().filters.priceRange.min || null,
        [QueryParam.PriceLte]: thunkApi.getState().filters.priceRange.max || null,
        [QueryParam.Limit]: GUITARS_PER_PAGE,
        [QueryParam.Start]: GUITARS_PER_PAGE * (thunkApi.getState().pagination.currentPage - 1),
        [QueryParam.Embed]: EmbedComments,
        ...params,
      },
    });


    const allPages = Math.ceil(response.headers[TotalCountHeader] / GUITARS_PER_PAGE);
    thunkApi.dispatch(loadTotalPageCount(allPages));
    thunkApi.dispatch(loadFilteredGuitars(response.data));
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
