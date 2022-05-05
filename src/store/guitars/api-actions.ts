import { loadFilteredGuitars, loadGuitars, loadGuitarsByName } from './slice';
import { ApiRoute } from '../../constants/api-route';
import { RootState } from '../store';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';
import { QueryParametersType } from '../../types/query-params';
import { QueryParam } from '../../constants/query-param';
import { loadTotalPageCount } from '../pagination/slice';

const GUITARS_PER_PAGE = 9;
const TotalCountHeader = 'x-total-count';
const EmbedComments = 'comments';

export const fetchGuitarsList = (): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`);
  dispatch(loadGuitars(response.data));
};

export const fetchFilteredGuitarsList = (params?: QueryParametersType): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`, {
    params: {
      [QueryParam.StringCount]: _getState().filters.quantityOfStrings,
      [QueryParam.Type]: _getState().filters.guitarType,
      [QueryParam.PriceGte]: _getState().filters.priceRange.min || null,
      [QueryParam.PriceLte]: _getState().filters.priceRange.max || null,
      [QueryParam.Limit]: GUITARS_PER_PAGE,
      [QueryParam.Start]: GUITARS_PER_PAGE * (_getState().pagination.currentPage - 1),
      [QueryParam.Embed]: EmbedComments,
      ...params,
    },
  });

  const allPages = Math.ceil(response.headers[TotalCountHeader] / GUITARS_PER_PAGE);
  dispatch(loadTotalPageCount(allPages));
  dispatch(loadFilteredGuitars(response.data));
};

export const fetchGuitarsListByName = (name: string): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoute.Guitars}`, {
    params: {
      [QueryParam.NameLike]: name,
    },
  });

  dispatch(loadGuitarsByName(response.data));
};
