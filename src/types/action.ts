import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadGuitars, loadGuitarsCount, setSortOrder, setSortType } from '../store/action';
import { RootState } from '../store/root-reducer';

enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  SetSortType = 'catalog/setSortType',
  SetSortOrder = 'catalog/setSortOrder',
  RedirectToRoute = 'redirectToRoute',
}

export type Actions =
| ReturnType<typeof loadGuitars>
| ReturnType<typeof loadGuitarsCount>
| ReturnType<typeof setSortType>
| ReturnType<typeof setSortOrder>;

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<RootState, AxiosInstance, Actions>;

export {ActionType};
export type {ThunkActionResult, ThunkAppDispatch};
