import { useState } from 'react';

interface UsePaginationProps {
  contentPerPage: number;
  count: number;
}

interface UsePaginationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  setPage: (page: number) => void;
}
type UsePagination = (arg0: UsePaginationProps) => UsePaginationReturn;

const usePagination: UsePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSafe = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };
  return {
    totalPages: pageCount,
    onNextPageClick: () => changePage(true),
    onPrevPageClick: () => changePage(false),
    setPage: setPageSafe,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
export default usePagination;
