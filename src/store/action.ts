import { createAction } from '@reduxjs/toolkit';
import { AppRoute, FetchStatus, SortOrder, SortType } from '../const';
import { ActionType } from '../types/action';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';

const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

const loadGuitarsCount = createAction(
  ActionType.LoadGuitarsCount,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

const setSortType = createAction(
  ActionType.SetSortType,
  (sortType: SortType) => ({
    payload: sortType,
  }),
);

const setSortOrder = createAction(
  ActionType.SetSortOrder,
  (sortOrder: SortOrder) => ({
    payload: sortOrder,
  }),
);

const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

const loadComments = createAction(
  ActionType.LoadComments,
  (comments: CommentType[]) => ({
    payload: {comments},
  }),
);

const setCatalogFetchStatusAction = createAction(
  ActionType.SetCatalogFetchStatus,
  (status: FetchStatus) => ({
    payload: status,
  }),
);

const setUserPriceMin = createAction(
  ActionType.SetUserPriceMin,
  (userPriceMin: string) => ({
    payload: {
      userPriceMin,
    },
  }),
);

const setUserPriceMax = createAction(
  ActionType.SetUserPriceMax,
  (userPriceMax: string) => ({
    payload: {
      userPriceMax,
    },
  }),
);

const loadGuitarsOnPage = createAction(
  ActionType.LoadGuitarsOnPage,
  (guitarsOnPage: GuitarType[]) => ({
    payload: {
      guitarsOnPage,
    },
  }),
);

const setGuitarsCount = createAction(
  ActionType.SetGuitarsCount,
  (guitarsCount: number) => ({
    payload: {
      guitarsCount,
    },
  }),
);

export {setGuitarsCount, loadGuitarsOnPage, setUserPriceMin, setUserPriceMax, loadGuitars, loadGuitarsCount, setSortType, setSortOrder, redirectToRoute, loadComments, setCatalogFetchStatusAction};
