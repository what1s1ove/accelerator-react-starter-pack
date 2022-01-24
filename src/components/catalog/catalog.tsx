import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchGuitarProperty, QueryParams } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import { fetchGuitarsAction, fetchGuitarsOnPageAction } from '../../store/api-actions';
import { getDataLoadingStatus, getGuitars } from '../../store/selectors';
import CatalogFilters from '../catalog-filters/catalog-filters';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCards from '../product-cards/product-cards';

function Catalog(): JSX.Element {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const isDataLoaded = useSelector(getDataLoadingStatus);

  const querySortType = queryParams.has(QueryParams.Sort) ? queryParams.get(QueryParams.Sort) : '';
  const queryOrderType = queryParams.has(QueryParams.Order) ? queryParams.get(QueryParams.Order) : '';
  const queryUserPriceMin = queryParams.has(QueryParams.PriceGte) ? queryParams.get(QueryParams.PriceGte) : '';
  const queryUserPriceMax = queryParams.has(QueryParams.PriceLte) ? queryParams.get(QueryParams.PriceLte) : '';
  const queryFourString = queryParams.has(QueryParams.FourString) ? Boolean(Number(queryParams.get(QueryParams.FourString))) : false;
  const querySixString = queryParams.has(QueryParams.SixString) ? Boolean(Number(queryParams.get(QueryParams.SixString))) : false;
  const querySevenString = queryParams.has(QueryParams.SevenString) ? Boolean(Number(queryParams.get(QueryParams.SevenString))) : false;
  const queryTwelveString = queryParams.has(QueryParams.TwelveString) ? Boolean(Number(queryParams.get(QueryParams.TwelveString))) : false;
  const queryAcusticType = queryParams.has(QueryParams.AcousticType) ? Boolean(Number(queryParams.get(QueryParams.AcousticType))) : false;
  const queryElectricType = queryParams.has(QueryParams.ElectricType) ? Boolean(Number(queryParams.get(QueryParams.ElectricType))) : false;
  const queryUkuleleType = queryParams.has(QueryParams.UkuleleType) ? Boolean(Number(queryParams.get(QueryParams.UkuleleType))) : false;
  const queryCurrentPage = queryParams.has(QueryParams.CurrentPageNumber) ? Number(queryParams.get(QueryParams.CurrentPageNumber)) : 0;

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
    dispatch(fetchGuitarsAction(fetchParams));
  }, [dispatch, queryAcusticType, queryCurrentPage, queryElectricType, queryFourString, queryOrderType, querySevenString, querySixString, querySortType, queryTwelveString, queryUkuleleType, queryUserPriceMax, queryUserPriceMin]);

  const catalogCards = useSelector(getGuitars);

  if (!isDataLoaded) {
    return (
      <div className="catalog">
        <CatalogFilters />
        <CatalogSort />
        Loading...
      </div>
    );
  }

  return (
    <div className="catalog">
      <CatalogFilters />
      <CatalogSort />
      <ProductCards productCards={catalogCards} />
      <CatalogPagination />
    </div>
  );
}

export default Catalog;
