import { combineReducers } from 'redux';
import { errorReducer } from './error/error-reducer';
import { guitarReducer } from './guitar/guitar-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';
import { orderReducer } from './order/order-reducer';

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
  Error = 'ERROR',
  Order = 'ORDER',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsReducer,
  [NameSpace.Guitar]: guitarReducer,
  [NameSpace.Error]: errorReducer,
  [NameSpace.Order]: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
