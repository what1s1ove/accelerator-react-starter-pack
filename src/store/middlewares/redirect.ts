import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { ActionType } from '../../types/action';
import { RootState } from '../root-reducer';

const redirect: Middleware<unknown, RootState> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

export {redirect};
