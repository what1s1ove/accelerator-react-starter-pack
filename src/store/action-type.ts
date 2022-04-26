import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './reducer';
import {changeSort, loadSelectedGuitar, loadGuitars, redirectToRoute} from './action';

enum ActionType {
  ChangeSort = 'sort/changeSort',
  LoadSelectedGuitar = 'guitar/loadSelectedGuitar',
  LoadGuitars = 'data/loadGuitars',
  RedirectToRoute = 'user/redirectToRoute',
}

type Actions =
  | ReturnType<typeof changeSort>
  | ReturnType<typeof loadSelectedGuitar>
  | ReturnType<typeof loadGuitars>
  | ReturnType<typeof redirectToRoute>

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {
  ActionType
};

export type {
  Actions,
  ThunkActionResult,
  ThunkAppDispatch
};
