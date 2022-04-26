import { createAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../../constants/action-types';

export const loadSortingType = createAction(ActionTypes.LOAD_SORTING_TYPE, (sortingType: string) => ({
  payload: sortingType,
}));

export const loadSortingOrder = createAction(ActionTypes.LOAD_SORTING_ORDER, (sortingOrder: string) => ({
  payload: sortingOrder,
}));
