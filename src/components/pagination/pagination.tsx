import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setPageNumber } from '../../store/action';
import { fetchGuitarsAction } from '../../store/api-actions';
import { getPageCount, getPageNumber } from '../../store/guitars/selectors';

function Pagination(): JSX.Element {
  const pageNumber = useSelector(getPageNumber);
  const pageCount = useSelector(getPageCount);
  const dispatch = useDispatch();
  const handlePageNumber = (number: number) => {
    dispatch(setPageNumber(number));
    dispatch(fetchGuitarsAction());
  };

  const pages = [];
  for (let index = 1; index <= pageCount; index++) {
    pages.push(
      <li key={`${index}`} className={`pagination__page ${pageNumber === index ? 'pagination__page--active' : ''}`}>
        <Link
          onClick={() => handlePageNumber(index)}
          className="link pagination__page-link"
          to={AppRoute.Catalog.replace(':id', pageNumber ? pageNumber.toString(): '1')}
        >
          {index}
        </Link>
      </li>,
    );
  }
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {(pageNumber && (pageNumber > 1)) && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              onClick={() => handlePageNumber(pageNumber - 1)}
              className="link pagination__page-link"
              to={AppRoute.Catalog.replace(':id', pageNumber.toString())}
            >
              Назад
            </Link>
          </li>)}
        {pages}
        {(pageNumber && (pageNumber < pageCount)) && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              onClick={() => handlePageNumber(pageNumber + 1)}
              className="link pagination__page-link"
              to={AppRoute.Catalog.replace(':id', pageNumber.toString())}
            >
              Далее
            </Link>
          </li>)}
      </ul>
    </div>
  );
}

export default Pagination;
