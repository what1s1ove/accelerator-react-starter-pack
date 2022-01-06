import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { changeFilter, filterGuitars, updateGuitars, uploadGuitars } from '../store/actions';
import { State } from './state';

enum ActionTypes {
  UpdateGuitars = 'data/updateGuitars',
  UploadGuitars = 'data/uploadGuitars',
  FilterGuitars = 'data/filterGuitars',
  ChangeFilter = 'filter/changeFilter'
}

type Actions =
  | ReturnType<typeof updateGuitars>
  | ReturnType<typeof uploadGuitars>
  | ReturnType<typeof filterGuitars>
  | ReturnType<typeof changeFilter>

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {
  ActionTypes
};

export type {
  ThunkActionResult,
  ThunkAppDispatch
};
