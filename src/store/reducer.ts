import {ActionType, Actions} from './action-type';
import {Guitar} from '../types/guitar';
import {Sorts} from '../const';

type State = {
  guitar?: Guitar,
  guitars: Guitar[],
  isDataLoaded: boolean,
  activeSort: Sorts,
};

const initialState = {
  guitar: undefined,
  guitars: [],
  isDataLoaded: false,
  activeSort: Sorts.byPrice,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ChangeSort:
      return {...state, activeSort: action.payload as Sorts};
    case ActionType.LoadSelectedGuitar:
      return {...state, guitar: action.payload as Guitar};
    case ActionType.LoadGuitars:
      return {...state, guitars: action.payload as Guitar[]};
    default:
      return {...state};
  }
}

export type {
  State
};

export {
  initialState,
  reducer
};
