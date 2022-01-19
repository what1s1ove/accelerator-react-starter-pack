/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { APIRoute, AppRoute, FetchGuitarProperty, FetchStatus, FilterByType, FilterPath, PRODUCTS_PER_PAGE, stringLabels } from '../const';
import { ThunkActionResult } from '../types/action';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';
import { loadComments, loadGuitars, loadGuitarsCount, loadGuitarsOnPage, redirectToRoute, setCatalogFetchStatusAction, setGuitarsCount } from './action';

const fetchGuitarsAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCatalogFetchStatusAction(FetchStatus.InProgress));
    try {
      const {data} = await api.get<GuitarType[]>(APIRoute.Catalog);
      dispatch(loadGuitars(data));
      dispatch(setCatalogFetchStatusAction(FetchStatus.Success));
      data.map((guitar) => api.get<CommentType[]>(APIRoute.CurrentGuitarComments(guitar.id)).then((response) => {
        dispatch(loadComments(response.data));
      }));
    } catch (error) {
      toast.error('Сервер недоступен');
    }
  };

const fetchFilteredGuitarsAction = (fetchProperty: FetchGuitarProperty): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {
      userPriceMin,
      userPriceMax,
      isAcousticCheck,
      isElectricCheck,
      isUkuleleCheck,
      isFourStringsCheck,
      isSixStringsCheck,
      isSevenStringsCheck,
      isTwelveStringsCheck,
    } = fetchProperty;

    let path = `${APIRoute.Catalog}?`;

    if (userPriceMin) {
      path += `${FilterPath.PriceGte}${userPriceMin}`;
    }
    if (userPriceMax) {
      path += `${FilterPath.PriceLte}${userPriceMax}`;
    }
    if (isAcousticCheck) {
      console.log(isAcousticCheck);
      path += `${FilterPath.Type}${FilterByType.Acoustic}`;
    }
    if (isElectricCheck) {
      path += `${FilterPath.Type}${FilterByType.Electric}`;
    }
    if (isUkuleleCheck) {
      path += `${FilterPath.Type}${FilterByType.Ukulele}`;
    }
    if (isFourStringsCheck) {
      path += `${FilterPath.String}${stringLabels.fourStrings}`;
    }
    if (isSixStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sixStrings}`;
    }
    if (isSevenStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sevenStrings}`;
    }
    if (isTwelveStringsCheck) {
      path += `${FilterPath.String}${stringLabels.twelveStrings}`;
    }

    dispatch(setCatalogFetchStatusAction(FetchStatus.InProgress));
    try {
      const {data} = await api.get<GuitarType[]>(path);
      dispatch(loadGuitars(data));
      dispatch(setCatalogFetchStatusAction(FetchStatus.Success));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.PageNotFound));
    }
  };

const fetchGuitarsCountAction = (filterParams: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarType[]>(APIRoute.GuitarsCount(filterParams));
      dispatch(loadGuitarsCount(data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.PageNotFound));
    }
  };

const fetchGuitarsOnPageAction = (fetchProperty: FetchGuitarProperty): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {
      sortType,
      orderType,
      userPriceMin,
      userPriceMax,
      isAcousticCheck,
      isElectricCheck,
      isUkuleleCheck,
      isFourStringsCheck,
      isSixStringsCheck,
      isSevenStringsCheck,
      isTwelveStringsCheck,
      currentPageNumber,
    } = fetchProperty;

    let path = `${APIRoute.Catalog}?${FilterPath.PaginationStart}${currentPageNumber * PRODUCTS_PER_PAGE}${FilterPath.PaginationEnd}${(currentPageNumber + 1) * PRODUCTS_PER_PAGE}`;

    if (sortType) {
      path += `${FilterPath.Sort}${sortType}`;
    }
    if (orderType) {
      path += `${FilterPath.Order}${orderType}`;
    }
    if (userPriceMin) {
      path += `${FilterPath.PriceGte}${userPriceMin}`;
    }
    if (userPriceMax) {
      path += `${FilterPath.PriceLte}${userPriceMax}`;
    }
    if (isAcousticCheck) {
      path += `${FilterPath.Type}${FilterByType.Acoustic}`;
    }
    if (isElectricCheck) {
      path += `${FilterPath.Type}${FilterByType.Electric}`;
    }
    if (isUkuleleCheck) {
      path += `${FilterPath.Type}${FilterByType.Ukulele}`;
    }
    if (isFourStringsCheck) {
      path += `${FilterPath.String}${stringLabels.fourStrings}`;
    }
    if (isSixStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sixStrings}`;
    }
    if (isSevenStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sevenStrings}`;
    }
    if (isTwelveStringsCheck) {
      path += `${FilterPath.String}${stringLabels.twelveStrings}`;
    }
    // dispatch(setIsDataLoaded(false));
    try {
      const { data, headers } = await api.get<GuitarType[]>(path);
      await
      // dispatch(fetchCommentsAction());
      dispatch(loadGuitarsOnPage(data));
      dispatch(setGuitarsCount(+headers['x-total-count']));
      // dispatch(setIsDataLoaded(true));
    } catch (error) {
      // dispatch(setIsDataLoaded(true));
    }
  };


export {fetchGuitarsAction, fetchFilteredGuitarsAction, fetchGuitarsCountAction, fetchGuitarsOnPageAction};
