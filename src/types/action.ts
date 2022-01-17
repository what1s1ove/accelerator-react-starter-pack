import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { State } from './state';

export enum ActionType {
  ChangeSortType = 'changeSortType',
  ChangeSortOrder = 'changeSortOrder',
  SetGuitars = 'setGuitars',
  SetGuitar = 'setGuitar',
  SetComments = 'setComments',
  SetSearchString = 'SetSearchString',
  SetPriceFrom = 'setPriceFrom',
  SetPriceTo = 'setPriceTo',
  SetTypeGuitars = 'setTypeGuitars',
  SetNumberStrings = 'setNumberStrings',
  PostComments = 'postComments',
  PostCoupons = 'postCoupons',
  PostOrders = 'postOrders',
  RedirectToRoute = 'redirectToRoute',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
