import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { fetchGuitars } from '../store/actions';
import { State } from './state';

enum ActionTypes {
  FetchGuitars = 'data/fetchGuitars',
}

type Actions =
 | ReturnType<typeof fetchGuitars>

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {
  ActionTypes
};

export type {
  ThunkActionResult,
  ThunkAppDispatch
};
