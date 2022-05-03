import { RootState } from '../store';

export const getCurrentPage = (state: RootState) => state.pagination.currentPage;
export const getTotalPageCount = (state: RootState) => state.pagination.totalPageCount;
