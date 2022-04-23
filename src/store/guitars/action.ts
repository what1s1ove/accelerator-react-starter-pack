import { createAction } from '@reduxjs/toolkit';
import { IGuitar } from '../../types/IGuitars';
import { ActionTypes } from '../../constants/action-types';

export const loadGuitars = createAction(ActionTypes.LOAD_GUITARS, (guitars: Array<IGuitar>) => ({
  payload: guitars,
}));
