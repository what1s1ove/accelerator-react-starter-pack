import { ActionTypes } from '../types/actions';

import { createAction } from '@reduxjs/toolkit';
import { Guitar } from '../types/shop-types';
import { FilterState } from '../types/state';

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

const filterGuitars = createAction(
  ActionTypes.FilterGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const changeFilter = createAction(
  ActionTypes.ChangeFilter,
  (filter: FilterState) => ({
    payload: filter,
  }),
);


export {
  updateGuitars,
  uploadGuitars,
  filterGuitars,
  changeFilter
};
