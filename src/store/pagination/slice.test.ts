import paginationReducer,{ initialState, loadCurrentPage, loadTotalPageCount } from './slice';

const CURRENT_PAGE = 1;
const TOTAL_PAGE_COUNT = 10;
describe('Pagination reducer', () => {
  test('Load current page', () => {
    expect(paginationReducer(initialState, loadCurrentPage(CURRENT_PAGE))).toEqual({
      ...initialState,
      currentPage: CURRENT_PAGE,
    });
  });

  test('Load all pages', () => {
    expect(paginationReducer(initialState, loadTotalPageCount(TOTAL_PAGE_COUNT))).toEqual({
      ...initialState,
      totalPageCount: TOTAL_PAGE_COUNT,
    });
  });
});
