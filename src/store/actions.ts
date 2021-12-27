import { ActionTypes } from '../types/actions';

import { createAction } from '@reduxjs/toolkit';
import { Guitar } from '../types/shop-types';

const fetchGuitars = createAction(
  ActionTypes.FetchGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export {
  fetchGuitars
};
