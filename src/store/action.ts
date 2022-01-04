import { createAction } from '@reduxjs/toolkit';
import { SortOrderOptions, SortTypeOptions } from '../const';
import { ActionType } from '../types/action';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';

export const getGuitars = createAction(
  ActionType.GetGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const getGuitar = createAction(
  ActionType.GetGuitar,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const getComments = createAction(
  ActionType.GetComments,
  (comments: Comment[]) => ({
    payload: comments,
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

// POST /comments – отправить новый комментарий.
// POST /coupons – отправить купон. Если купон валидный, роут возвращает процент скидки.
// POST /orders – отправить новый заказ.
