import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {GuitarsList} from '../types/guitar';

export const fillGuitarsList = createAction(
  ActionType.FillGuitarsList,
  (guitarsList: GuitarsList) => ({
    payload: guitarsList,
  }),
);

