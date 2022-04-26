import {Middleware} from 'redux';
import browserHistory from '../../browser-history';
import {reducer} from '../reducer';
import {ActionType} from '../action-type';

type Reducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

export {redirect};
