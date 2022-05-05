import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-type';
import { IPriceRange } from '../../types/IFilters';

export const loadSortingType = createAction(ActionType.LOAD_SORTING_TYPE, (sortingType: string) => ({
  payload: sortingType,
}));

export const loadSortingOrder = createAction(ActionType.LOAD_SORTING_ORDER, (sortingOrder: string) => ({
  payload: sortingOrder,
}));

export const loadQuantityOfStrings = createAction(ActionType.LOAD_QUANTITY_OF_STRINGS, (quantityOfStrings: string) => ({
  payload: quantityOfStrings,
}));

export const removeQuantityOfStrings = createAction(ActionType.REMOVE_QUANTITY_OF_STRINGS, (quantityOfStrings: string) => ({
  payload: quantityOfStrings,
}));

export const loadGuitarType = createAction(ActionType.LOAD_GUITAR_TYPE, (guitarType: string) => ({
  payload: guitarType,
}));

export const removeGuitarType = createAction(ActionType.REMOVE_GUITAR_TYPE, (guitarType: string) => ({
  payload: guitarType,
}));

export const loadGuitarsPriceRange = createAction(ActionType.LOAD_PRICE_RANGE, (priceRange: IPriceRange) => ({
  payload: priceRange,
}));
