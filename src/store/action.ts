import { createAction } from '@reduxjs/toolkit';
import { GuitarsType, SortOrderOptions, SortTypeOptions } from '../const';
import { ActionType } from '../types/action';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';

export const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const setGuitar = createAction(
  ActionType.SetGuitar,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const setComments = createAction(
  ActionType.SetComments,
  (comments: Comment[], guitarId: string) => ({
    payload: {comments, guitarId},
  }),
);

export const changeSortType = createAction(
  ActionType.ChangeSortType,
  (sortType: SortTypeOptions) => ({
    payload: sortType,
  }),
);

export const changeSortOrder = createAction(
  ActionType.ChangeSortOrder,
  (sortOrder: SortOrderOptions) => ({
    payload: sortOrder,
  }),
);

export const setSearchString = createAction(
  ActionType.SetSearchString,
  (searchString: string) => ({
    payload: searchString,
  }),
);

export const setPriceFrom = createAction(
  ActionType.SetPriceFrom,
  (priceFrom: number | undefined) => ({
    payload: priceFrom,
  }),
);

export const setPriceTo = createAction(
  ActionType.SetPriceTo,
  (priceTo: number | undefined) => ({
    payload: priceTo,
  }),
);

export const toggleTypeGuitar = createAction(
  ActionType.SetTypeGuitars,
  (typeGuitar: GuitarsType) => ({
    payload: typeGuitar,
  }),
);

export const toggleNumberString = createAction(
  ActionType.SetNumberStrings,
  (numberString: number) => ({
    payload: numberString,
  }),
);

// POST /comments – отправить новый комментарий.
// POST /coupons – отправить купон. Если купон валидный, роут возвращает процент скидки.
// POST /orders – отправить новый заказ.
