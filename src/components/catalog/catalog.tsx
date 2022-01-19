import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchGuitarProperty, FetchStatus, QueryParam } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import { fetchFilteredGuitarsAction, fetchGuitarsOnPageAction } from '../../store/api-actions';
import { getCatalogFetchStatusSelector, getGuitars } from '../../store/selectors';
import CatalogFilters from '../catalog-filters/catalog-filters';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCards from '../product-cards/product-cards';

function Catalog(): JSX.Element {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();

  const querySortType = queryParams.has(QueryParam.Sort) ? queryParams.get(QueryParam.Sort) : '';
  const queryOrderType = queryParams.has(QueryParam.Order) ? queryParams.get(QueryParam.Order) : '';
  const queryUserPriceMin = queryParams.has(QueryParam.PriceGte) ? queryParams.get(QueryParam.PriceGte) : '';
  const queryUserPriceMax = queryParams.has(QueryParam.PriceLte) ? queryParams.get(QueryParam.PriceLte) : '';
  const queryFourString = queryParams.has(QueryParam.FourString) ? Boolean(Number(queryParams.get(QueryParam.FourString))) : false;
  const querySixString = queryParams.has(QueryParam.SixString) ? Boolean(Number(queryParams.get(QueryParam.SixString))) : false;
  const querySevenString = queryParams.has(QueryParam.SevenString) ? Boolean(Number(queryParams.get(QueryParam.SevenString))) : false;
  const queryTwelveString = queryParams.has(QueryParam.TwelveString) ? Boolean(Number(queryParams.get(QueryParam.TwelveString))) : false;
  const queryAcusticType = queryParams.has(QueryParam.AcousticType) ? Boolean(Number(queryParams.get(QueryParam.AcousticType))) : false;
  const queryElectricType = queryParams.has(QueryParam.ElectricType) ? Boolean(Number(queryParams.get(QueryParam.ElectricType))) : false;
  const queryUkuleleType = queryParams.has(QueryParam.UkuleleType) ? Boolean(Number(queryParams.get(QueryParam.UkuleleType))) : false;
  const queryCurrentPage = queryParams.has(QueryParam.CurrentPageNumber) ? Number(queryParams.get(QueryParam.CurrentPageNumber)) : 0;

  useEffect(() => {
    const fetchParams: FetchGuitarProperty = {
      sortType: querySortType ? querySortType : '',
      orderType: queryOrderType ? queryOrderType : '',
      userPriceMin: queryUserPriceMin ? queryUserPriceMin : '',
      userPriceMax: queryUserPriceMax ? queryUserPriceMax : '',
      isAcousticCheck: queryAcusticType,
      isElectricCheck: queryElectricType,
      isUkuleleCheck: queryUkuleleType,
      isFourStringsCheck: queryFourString,
      isSixStringsCheck: querySixString,
      isSevenStringsCheck: querySevenString,
      isTwelveStringsCheck: queryTwelveString,
      currentPageNumber: queryCurrentPage,
    };
    dispatch(fetchGuitarsOnPageAction(fetchParams));
    dispatch(fetchFilteredGuitarsAction(fetchParams));
  }, [dispatch, queryAcusticType, queryCurrentPage, queryElectricType, queryFourString, queryOrderType, querySevenString, querySixString, querySortType, queryTwelveString, queryUkuleleType, queryUserPriceMax, queryUserPriceMin]);

  const catalogCards = useSelector(getGuitars);
  const fetchStatus = useSelector(getCatalogFetchStatusSelector);

  return (
    <div className="catalog" data-testid='catalog'>
      <CatalogFilters />
      <CatalogSort />
      {
        fetchStatus === FetchStatus.InProgress
        && <>Loading...</>
      }
      {
        fetchStatus === FetchStatus.Success
        && catalogCards.length > 0
        &&
        <ProductCards productCards={catalogCards} />
      }
      <CatalogPagination />
    </div>
  );
}

export default Catalog;
