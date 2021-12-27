import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FIRST_PAGE, PAGES_PER_LINE, pageNavigationRoute } from '../../const';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-action';
import { RootState } from '../../store/root-reducer';
import { getGuitarsCount, getSortOrder, getSortType } from '../../store/selectors';
import { ThunkAppDispatch } from '../../types/action';
import { getFirstPage, getPageCount, getRestOfGuitars } from '../../utils/utils';

const mapStateToProps = (state: RootState) => ({
  guitarsCount: getGuitarsCount(state),
  sort: getSortType(state),
  order: getSortOrder(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onPageChange(filterParams: string, sort: string, order: string, pageNumber: number) {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, pageNumber));
    dispatch(fetchGuitarsCountAction(filterParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogPagination(props: PropsFromRedux): JSX.Element {
  const {onPageChange, guitarsCount, sort, order} = props;

  const {pageNumber} = useParams<{pageNumber: string}>();

  const currentPage = pageNumber ? Number(pageNumber) : FIRST_PAGE;

  const filterParams = String(useLocation<string>().search);

  const getPages = (initialPage: number) => {
    const pages = [];

    const firstPageInList = getFirstPage(initialPage);

    for (let i = firstPageInList; i < firstPageInList + PAGES_PER_LINE && i <= getPageCount(guitarsCount); i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    onPageChange(filterParams, sort, order, currentPage);
  }, [filterParams, onPageChange, currentPage, sort, order]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > PAGES_PER_LINE ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={pageNavigationRoute.PageNaviation((getFirstPage(currentPage) - PAGES_PER_LINE), filterParams)} className="link pagination__page-link">Назад</Link>
          </li>
          : ''}
        {getPages(currentPage).map((page) => (
          <li key={`page-${page}`} className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}` }>
            <Link to={pageNavigationRoute.PageNaviation(page, filterParams)} className="link pagination__page-link">{page}</Link>
          </li>
        ))}
        {getRestOfGuitars(guitarsCount, currentPage) > 0 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={pageNavigationRoute.PageNaviation((getFirstPage(currentPage) + PAGES_PER_LINE), filterParams)} className="link pagination__page-link">Далее</Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export {CatalogPagination};
export default connector(CatalogPagination);
