import { SortOrder, SortType } from '../const';
import { Actions, ActionType } from '../types/action';
import { SearchParameters } from '../types/search';

const initialState: SearchParameters = {
  sortType: SortType.Unknown,
  sortOrder: SortOrder.Unknown,
};

const searchParameters = (state = initialState, action: Actions): SearchParameters => {
  switch (action.type) {
    case ActionType.SetSortType: {
      const sortType = action.payload;
      return {...state, sortType: sortType};
    }
    case ActionType.SetSortOrder: {
      const sortOrder = action.payload;
      return {...state, sortOrder: sortOrder};
    }
    default:
      return state;
  }
};

export {searchParameters};
