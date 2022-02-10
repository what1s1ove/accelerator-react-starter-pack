import { ActionTypes } from '../types/actions';

import { createAction } from '@reduxjs/toolkit';
import { Comment, Guitar } from '../types/shop-types';
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

const updateFilter = createAction(
  ActionTypes.UpdateFilter,
  (filter: FilterState) => ({
    payload: filter,
  }),
);

const uploadComments = createAction(
  ActionTypes.UploadComments,
  (comments: Comment[]) => ({
    payload: comments,
  }),
);


export {
  updateGuitars,
  uploadGuitars,
  updateFilter,
  uploadComments
};
