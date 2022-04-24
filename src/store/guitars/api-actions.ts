import { loadGuitars, loadGuitarsByName } from './action';
import { ApiRoutes } from '../../constants/api-routes';
import { RootState } from '../store';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';

export const fetchGuitarsList = (): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoutes.Guitars}`);
  dispatch(loadGuitars(response.data));
};

export const fetchGuitarsListByName = (name: string): ThunkAction<Promise<void>, RootState, AxiosInstance, Action> => async (dispatch, _getState, api) => {
  const response = await api.get(`${process.env.REACT_APP_SERVER_URL}${ApiRoutes.Guitars}`, {
    params: {
      'name_like': name,
    },
  });
  dispatch(loadGuitarsByName(response.data));
};
