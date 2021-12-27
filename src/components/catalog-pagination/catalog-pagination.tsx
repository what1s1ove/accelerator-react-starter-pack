import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FIRST_PAGE, PAGES_STEP, pageNavigationRoute } from '../../const';
import { fetchFilteredGuitarsAction } from '../../store/api-action';
import { RootState } from '../../store/root-reducer';
import { getGuitars } from '../../store/selectors';
import { ThunkAppDispatch } from '../../types/action';
import { getFirstPage } from '../../utils';

const mapStateToProps = (state: RootState) => ({
  guitars: getGuitars(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onPageChange(filterParams: string, pageNumber: number) {
    dispatch(fetchFilteredGuitarsAction(filterParams, pageNumber));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogPagination(props: PropsFromRedux): JSX.Element {
  const {onPageChange, guitars} = props;

  let {pageNumber} = useParams<{pageNumber: string}>();

  if (!pageNumber) {
    pageNumber = String(FIRST_PAGE);
  }

  const filterParams = String(useLocation<string>().search);

  const getPages = (initialPage: number) => {
    const pages = [];

    const firstPageInList = getFirstPage(initialPage);

    for (let i = firstPageInList; i < firstPageInList + PAGES_STEP; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    onPageChange(filterParams, Number(pageNumber));
  }, [filterParams, onPageChange, pageNumber]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {Number(pageNumber) > PAGES_STEP ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={pageNavigationRoute.PageNaviation((Number(pageNumber) - 1), filterParams)} className="link pagination__page-link">Назад</Link>
          </li>
          : ''}
        {getPages(Number(pageNumber)).map((page) => (
          <li key={`page-${page}`} className={`pagination__page ${page === Number(pageNumber) ? 'pagination__page--active' : ''}` }>
            <Link to={pageNavigationRoute.PageNaviation(page, filterParams)} className="link pagination__page-link">{page}</Link>
          </li>
        ))}
        {guitars.length !== 0 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={pageNavigationRoute.PageNaviation((getFirstPage(Number(pageNumber)) + PAGES_STEP), filterParams)} className="link pagination__page-link">Далее</Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export {CatalogPagination};
export default connector(CatalogPagination);
