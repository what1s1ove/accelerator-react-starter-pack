import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-type';

export const loadCurrentPage = createAction(ActionType.LOAD_CURRENT_PAGE, (currentPage: number) => ({
  payload: currentPage,
}));

export const loadTotalPageCount = createAction(ActionType.LOAD_ALL_PAGES, (totalPageCount: number) => ({
  payload: totalPageCount,
}));
