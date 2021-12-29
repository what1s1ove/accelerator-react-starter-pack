import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FIRST_PAGE, PAGES_COUNT, pageNavigationRoute } from '../../const';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-action';
import { getGuitarsCount, getSortOrder, getSortType } from '../../store/selectors';
import { getFirstPage, getPageCount, getRestOfGuitars } from '../../utils/utils';

function CatalogPagination(): JSX.Element {
  const guitarsCount = useSelector(getGuitarsCount);
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);
  const dispatch = useDispatch();

  const {pageNumber} = useParams<{pageNumber: string}>();

  const currentPage = pageNumber ? Number(pageNumber) : FIRST_PAGE;

  const filterParams = String(useLocation<string>().search);

  const getPages = (initialPage: number) => {
    const pages = [];

    const firstPageInList = getFirstPage(initialPage);

    for (let i = firstPageInList; i < firstPageInList + PAGES_COUNT && i <= getPageCount(guitarsCount); i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterParams, sortType, sortOrder, currentPage));
    dispatch(fetchGuitarsCountAction(filterParams));
  }, [filterParams, currentPage, sortType, sortOrder, dispatch]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > PAGES_COUNT ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={pageNavigationRoute.PageNaviation((getFirstPage(currentPage) - PAGES_COUNT), filterParams)} className="link pagination__page-link">Назад</Link>
          </li>
          : ''}
        {getPages(currentPage).map((page) => (
          <li key={`page-${page}`} className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}` }>
            <Link to={pageNavigationRoute.PageNaviation(page, filterParams)} className="link pagination__page-link">{page}</Link>
          </li>
        ))}
        {getRestOfGuitars(guitarsCount, currentPage) > 0 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={pageNavigationRoute.PageNaviation((getFirstPage(currentPage) + PAGES_COUNT), filterParams)} className="link pagination__page-link">Далее</Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export default CatalogPagination;
