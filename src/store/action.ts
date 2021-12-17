import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar';

const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

export {loadGuitars};
