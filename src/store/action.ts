import {ActionType} from './action-type';
import {Guitar} from '../types/guitar';
import {Sorts} from '../const';

type Action<T> = {
  type: string,
  payload: T,
}

function changeSort(sort: Sorts): Action<Sorts> {
  return ({
    type: ActionType.ChangeSort,
    payload: sort,
  }) as const;
}

function loadSelectedGuitar(product: Guitar): Action<Guitar> {
  return ({
    type: ActionType.LoadSelectedGuitar,
    payload: product,
  }) as const;
}

function loadGuitars(products: Guitar[]): Action<Guitar[]> {
  return ({
    type: ActionType.LoadGuitars,
    payload: products,
  }) as const;
}

function redirectToRoute(url: string): Action<string> {
  return ({
    type: ActionType.RedirectToRoute,
    payload: url,
  }) as const;
}

export {
  changeSort,
  loadSelectedGuitar,
  loadGuitars,
  redirectToRoute
};
