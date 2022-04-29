import { createAction } from '@reduxjs/toolkit';
import { IGuitar } from '../../types/IGuitars';
import { ActionTypes } from '../../constants/action-types';

export const loadGuitars = createAction(ActionTypes.LOAD_GUITARS, (guitars: Array<IGuitar>, allPages?: number) => ({
  payload: guitars,
}));

export const loadGuitarsByName = createAction(ActionTypes.LOAD_GUITARS_BY_NAME, (guitarsByName: Array<IGuitar>) => ({
  payload: guitarsByName,
}));

export const loadFilteredGuitars = createAction(ActionTypes.LOAD_FILTERED_GUITARS, (filteredGuitars: Array<IGuitar>, totalPageCount: number) => ({
  payload: {
    filteredGuitars,
    totalPageCount,
  },
}));
