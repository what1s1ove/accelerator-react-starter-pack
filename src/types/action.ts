import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadGuitars } from '../store/action';
import { RootState } from '../store/root-reducer';

enum ActionType {
  LoadGuitars = 'data/loadGuitars',
}

type Actions =
| ReturnType<typeof loadGuitars>;

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<RootState, AxiosInstance, Actions>;

export {ActionType};
export type {ThunkActionResult, ThunkAppDispatch};
