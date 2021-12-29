import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { APIRoute, FIRST_PAGE } from '../const';
import { createAPI } from '../services/api';
import { makeFakeGuitars } from '../utils/mocks';
import { loadGuitars, loadGuitarsCount } from './action';
import { fetchFilteredGuitarsAction, fetchGuitarsAction, fetchGuitarsCountAction } from './api-action';
import { RootState } from './root-reducer';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(createAPI);
  const middlewares = [thunk.withExtraArgument(createAPI)];

  const mockStore = configureMockStore<
      RootState,
      Action,
      ThunkDispatch<RootState, typeof createAPI, Action>
    >(middlewares);

  it('should dispatch LoadGuitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();
    mockAPI
      .onGet(APIRoute.Catalog)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });


  it('should dispatch LoadGuitars when GET /guitars with filters', async () => {
    const mockGuitars = makeFakeGuitars();
    mockAPI
      .onGet(APIRoute.FilterQuery('', '', '', FIRST_PAGE))
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchFilteredGuitarsAction('', '', '', FIRST_PAGE));

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

  it('should dispatch LoadGuitarsCount when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();
    mockAPI
      .onGet(APIRoute.GuitarsCount(''))
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsCountAction(''));

    expect(store.getActions()).toEqual([
      loadGuitarsCount(mockGuitars),
    ]);
  });
});
