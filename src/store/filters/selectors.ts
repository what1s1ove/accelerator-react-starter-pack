import { RootState } from '../store';

export const getSortingType = (state: RootState) => state.filters.sortingType;
export const getSortingOrder = (state: RootState) => state.filters.sortingOrder;
