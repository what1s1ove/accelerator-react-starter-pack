import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { State } from './state';

export enum ActionType {
  GetGuitars = 'getGuitars',
  GetGuitar = 'getGuitar',
  GetComments = 'getComments',
  ChangeSortType = 'changeSortType',
  ChangeSortOrder = 'changeSortOrder',
  PostComments = 'postComments',
  PostCoupons = 'postCoupons',
  PostOrders = 'postOrders',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
