import { loadFilteredGuitars, loadGuitars, loadGuitarsByName } from './action';
import { ApiRoutes } from '../../constants/api-routes';
import { RootState } from '../store';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';
import { QueryParametersType } from '../../types/query-params';
import { QueryParams } from '../../constants/query-params';

const GUITARS_PER_PAGE = 9;
const TotalCountHeader = 'x-total-count';

export const fetchGuitarsList = (): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoutes.Guitars}`);
  dispatch(loadGuitars(response.data));
};

export const fetchFilteredGuitarsList = (params?: QueryParametersType): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoutes.Guitars}`, {
    params: {
      [QueryParams.StringCount]: _getState().filters.quantityOfStrings,
      [QueryParams.Type]: _getState().filters.guitarType,
      [QueryParams.Price_Gte]: _getState().filters.priceRange.min || null,
      [QueryParams.Price_Lte]: _getState().filters.priceRange.max || null,
      [QueryParams.Limit]: GUITARS_PER_PAGE,
      [QueryParams.Start]: GUITARS_PER_PAGE * (_getState().pagination.currentPage - 1),
      ...params,
    },
  });

  const allPages = Math.ceil(response.headers[TotalCountHeader] / GUITARS_PER_PAGE);
  dispatch(loadFilteredGuitars(response.data, allPages));
};

export const fetchGuitarsListByName = (name: string): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoutes.Guitars}`, {
    params: {
      [QueryParams.NameLike]: name,
    },
  });

  dispatch(loadGuitarsByName(response.data));
};
