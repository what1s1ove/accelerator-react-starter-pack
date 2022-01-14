import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';

enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadComments = 'data/loadComments',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  SetSortType = 'catalog/setSortType',
  SetSortOrder = 'catalog/setSortOrder',
  RedirectToRoute = 'redirectToRoute',
  SetCatalogFetchStatus = 'Catalog/SetCatalogFetchStatus',
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>;

export {ActionType};
export type {ThunkActionResult};
