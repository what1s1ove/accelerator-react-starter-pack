import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {GuitarsList} from '../types/guitar';

export const fillGuitarsListAction = createAction(
  ActionType.FillGuitarsList,
  (guitarsList: GuitarsList) => ({
    payload: guitarsList,
  }),
);

export const changeSortByTypeAction = createAction(
  ActionType.ChangeSortByType,
  (sortType:string) => ({
    payload: sortType,
  }),
);

export const changeSortByIncrease = createAction(
  ActionType.ChangeSortByIncrease,
  (sortType:string) => ({
    payload: sortType,
  }),
);
