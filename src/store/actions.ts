import { ActionTypes } from '../types/actions';

import { createAction } from '@reduxjs/toolkit';
import { Guitar } from '../types/shop-types';

const updateGuitars = createAction(
  ActionTypes.UpdateGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const uploadGuitars = createAction(
  ActionTypes.UploadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);


export {
  updateGuitars,
  uploadGuitars
};
