/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const';
import { redirectToRoute } from '../action';
import { RootState } from '../root-reducer';
import { redirect } from './redirect';
import {configureMockStore} from '@jedmao/redux-mock-store';

// const fakeHistory = {
//   location: {pathname: ''},
//   push(path: string) {
//     this.location.pathname = path;
//   },
// };

// jest.mock('../../browser-history', () => fakeHistory);

// const middlewares = [redirect];
// const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
// const store = mockStore();

describe('Middleware: redirect', () => {
  // beforeEach(() => {
  //   fakeHistory.push('');
  // });

  // it('should be redirect to page not fount', () => {
  //   store.dispatch(redirectToRoute(AppRoute.PageNotFound));
  //   expect(fakeHistory.location.pathname).toBe(AppRoute.PageNotFound);
  //   expect(store.getActions()).toEqual([
  //     redirectToRoute(AppRoute.PageNotFound),
  //   ]);
  // });
});
