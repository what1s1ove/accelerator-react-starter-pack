import { createAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../../constants/action-types';

export const loadSortingType = createAction(ActionTypes.LOAD_SORTING_TYPE, (sortingType: string) => ({
  payload: sortingType,
}));

export const loadSortingOrder = createAction(ActionTypes.LOAD_SORTING_ORDER, (sortingOrder: string) => ({
  payload: sortingOrder,
}));

export const loadQuantityOfStrings = createAction(ActionTypes.LOAD_QUANTITY_OF_STRINGS, (quantityOfStrings: string) => ({
  payload: quantityOfStrings,
}));

export const removeQuantityOfStrings = createAction(ActionTypes.REMOVE_QUANTITY_OF_STRINGS, (quantityOfStrings: string) => ({
  payload: quantityOfStrings,
}));

export const loadGuitarType = createAction(ActionTypes.LOAD_GUITAR_TYPE, (guitarType: string) => ({
  payload: guitarType,
}));

export const removeGuitarType = createAction(ActionTypes.REMOVE_GUITAR_TYPE, (guitarType: string) => ({
  payload: guitarType,
}));
