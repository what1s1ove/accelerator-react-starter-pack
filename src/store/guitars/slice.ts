import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/api';
import { ActionType } from '../../constants/action-type';
import { ApiRoute } from '../../constants/api-route';
import { QueryParam } from '../../constants/query-param';
import { IFilters } from '../../types/IFilters';
import { IGuitarsState } from '../../types/IGuitars';
import { IPagination } from '../../types/IPagination';
import { QueryParametersType } from '../../types/query-params';
import { loadTotalPageCount } from '../pagination/slice';
// import { fetchFilteredGuitarsList } from './api-actions';

const GUITARS_PER_PAGE = 9;
const TotalCountHeader = 'x-total-count';
const EmbedComments = 'comments';

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
    // thunkApi.dispatch(loadFilteredGuitars(response.data));
  },
);

export const initialState: IGuitarsState = {
  guitars: [],
  filteredGuitars: {
    data: [],
    currentRequestId: '',
    loading: 'idle',
  },
  guitarsByName: [],
};

const guitars = createSlice({
  name: 'guitars',
  initialState: initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    loadGuitarsByName: (state, action) => {
      state.guitarsByName = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredGuitarsList.pending, (state, action) => {
        if (state.filteredGuitars.loading === 'idle') {
          state.filteredGuitars.loading = 'pending';
          state.filteredGuitars.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchFilteredGuitarsList.fulfilled, (state, action: any) => {
        const { requestId } = action.meta;

        if (
          state.filteredGuitars.loading === 'pending' &&
          state.filteredGuitars.currentRequestId === requestId
        ) {
          state.filteredGuitars.loading = 'idle';
          state.filteredGuitars.data = [...action.payload];
          state.filteredGuitars.currentRequestId = '';
        }
      });
  },
});

export const { loadGuitars, loadGuitarsByName } = guitars.actions;
export default guitars.reducer;
