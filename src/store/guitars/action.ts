import { createAction } from '@reduxjs/toolkit';
import { IGuitar } from '../../types/IGuitars';
import { ActionType } from '../../constants/action-type';

export const loadGuitars = createAction(ActionType.LOAD_GUITARS, (guitars: Array<IGuitar>) => ({
  payload: guitars,
}));

export const loadGuitarsByName = createAction(ActionType.LOAD_GUITARS_BY_NAME, (guitarsByName: Array<IGuitar>) => ({
  payload: guitarsByName,
}));

export const loadFilteredGuitars = createAction(ActionType.LOAD_FILTERED_GUITARS, (filteredGuitars: Array<IGuitar>, totalPageCount: number) => ({
  payload: {
    filteredGuitars,
    totalPageCount,
  },
}));
