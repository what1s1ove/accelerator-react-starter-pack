/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { FIRST_PAGE, PAGES_COUNT, pageNavigationRoute, QueryParam, AppRoute, PRODUCTS_PER_PAGE } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import { fetchGuitarsCountAction } from '../../store/api-actions';
import { getGuitarsCount, getSortOrder, getSortType } from '../../store/selectors';
import { getFirstPage, getPageCount } from '../../utils/utils';
import PaginationItem from './catalog-pagination-item';

function CatalogPagination(): JSX.Element {
  const guitarsCount = useSelector(getGuitarsCount);
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const history = useHistory();
  const paginationPageLinkCount = Math.ceil(guitarsCount / PRODUCTS_PER_PAGE);

  const {pageNumber} = useParams<{pageNumber: string}>();

  const currentPage = pageNumber ? Number(pageNumber) : FIRST_PAGE;

  const filterParams = String(useLocation<string>().search);

  // const getPages = (initialPage: number) => {
  //   const pages = [];

  //   const firstPageInList = getFirstPage(initialPage);

  //   for (let i = firstPageInList; i < firstPageInList + PAGES_COUNT && i <= getPageCount(guitarsCount); i++) {
  //     pages.push(i);
  //   }

  //   return pages;
  // };

  useEffect(() => {
    // dispatch(fetchFilteredGuitarsAction(filterParams, sortType, sortOrder, currentPage));
    dispatch(fetchGuitarsCountAction(filterParams));
  }, [filterParams, currentPage, sortType, sortOrder, dispatch]);

  useEffect(()=>{
    if (!queryParams.has(QueryParam.CurrentPageNumber)) {
      queryParams.set(QueryParam.CurrentPageNumber, '0');
      history.push(`${AppRoute.Query}${queryParams.toString()}`);
    }
  }, [history, queryParams]);

  const handlePrevLinkClick = () => {
    if (Number(queryParams.get(QueryParam.CurrentPageNumber)) > 0) {
      queryParams.set(QueryParam.CurrentPageNumber, String(Number(queryParams.get(QueryParam.CurrentPageNumber)) - 1));
      history.push(`${AppRoute.Query}${queryParams.toString()}`);
    }
  };

  const handleNextLinkClick = () => {
    queryParams.set(QueryParam.CurrentPageNumber, String(Number(queryParams.get(QueryParam.CurrentPageNumber)) + 1));
    history.push(`${AppRoute.Query}${queryParams.toString()}`);
  };

  if (guitarsCount <= PRODUCTS_PER_PAGE) {
    return (<div className="pagination page-content__pagination"></div>);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {Number(queryParams.get(QueryParam.CurrentPageNumber)) !== 0 &&
        <li className="pagination__page pagination__page--prev" id="prev">
          <a className="link pagination__page-link" href="#top" onClick={handlePrevLinkClick}>Назад</a>
        </li>}
        {new Array(paginationPageLinkCount)
          .fill('')
          .map((item, i) => <PaginationItem pageCount={i + 1} key={i++} activePage={Number(queryParams.get(QueryParam.CurrentPageNumber)) + 1} />)}
        {Number(queryParams.get(QueryParam.CurrentPageNumber)) !== paginationPageLinkCount - 1 &&
        <li className="pagination__page pagination__page--next" id="next">
          <a className="link pagination__page-link" href="#top" onClick={handleNextLinkClick}>Далее</a>
        </li>}
      </ul>
    </div>
  );
  // <div className="pagination page-content__pagination">
  //   <ul className="pagination__list">
  //     {currentPage > FIRST_PAGE ?
  //       <li className="pagination__page pagination__page--prev" id="prev">
  //         {/* <Link to={pageNavigationRoute.PageNaviation((currentPage - 1), filterParams)} className="link pagination__page-link">Назад</Link> */}
  //         <a className="link pagination__page-link" href="#top" onClick={handlePrevLinkClick}>Назад</a>
  //       </li>
  //       : ''}
  //     {getPages(currentPage).map((page) => (
  //       <li key={`page-${page}`} className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}` }>
  //         <Link to={pageNavigationRoute.PageNaviation(page, filterParams)} className="link pagination__page-link">{page}</Link>
  //       </li>
  //     ))}
  //     {currentPage < getPageCount(guitarsCount) ?
  //       <li className="pagination__page pagination__page--next" id="next">
  //         {/* <Link to={pageNavigationRoute.PageNaviation((currentPage + 1), filterParams)} className="link pagination__page-link">Далее</Link> */}
  //         <a className="link pagination__page-link" href="#top" onClick={handleNextLinkClick}>Далее</a>
  //       </li>
  //       : ''}
  //   </ul>
  // </div>
}

export default CatalogPagination;
