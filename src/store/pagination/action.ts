import { createAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../../constants/action-types';

export const loadCurrentPage = createAction(ActionTypes.LOAD_CURRENT_PAGE, (currentPage: number) => ({
  payload: currentPage,
}));

export const loadTotalPageCount = createAction(ActionTypes.LOAD_ALL_PAGES, (totalPageCount: number) => ({
  payload: totalPageCount,
}));
