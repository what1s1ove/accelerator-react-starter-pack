import { RootState } from '../store';

export const getSortingType = (state: RootState) => state.filters.sortingType;
export const getSortingOrder = (state: RootState) => state.filters.sortingOrder;
export const getQuantityOfStrings = (state: RootState) => state.filters.quantityOfStrings;
export const getGuitarType = (state: RootState) => state.filters.guitarType;
