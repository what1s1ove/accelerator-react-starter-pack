import { createAction } from '@reduxjs/toolkit';
import { SortOrder, SortType } from '../const';
import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar';

const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

const loadGuitarsCount = createAction(
  ActionType.LoadGuitarsCount,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

const setSortType = createAction(
  ActionType.SetSortType,
  (sort: SortType) => ({
    payload: sort,
  }),
);

const setSortOrder = createAction(
  ActionType.SetSortOrder,
  (sortOrder: SortOrder) => ({
    payload: sortOrder,
  }),
);

export {loadGuitars, loadGuitarsCount, setSortType, setSortOrder};
