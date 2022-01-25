import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { updateGuitars, uploadGuitars } from '../store/actions';
import { State } from './state';

enum ActionTypes {
  UpdateGuitars = 'data/updateGuitars',
  UploadGuitars = 'data/uploadGuitars',

}

type Actions =
  | ReturnType<typeof updateGuitars>
  | ReturnType<typeof uploadGuitars>


type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {
  ActionTypes
};

export type {
  ThunkActionResult,
  ThunkAppDispatch
};
