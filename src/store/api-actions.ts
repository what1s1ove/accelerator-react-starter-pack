import { toast } from 'react-toastify';
import { APIRoute, FetchGuitarProperty, FilterByType, FilterPath, PRODUCTS_PER_PAGE, stringLabels } from '../const';
import { ThunkActionResult } from '../types/action';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';
import { loadComments, loadGuitars, setGuitarsCount, setPriceRangeMax, setPriceRangeMin } from './action';

const fetchGuitarsAction = (fetchProperty: FetchGuitarProperty): ThunkActionResult =>
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
    } = fetchProperty;

    let path = `${APIRoute.Catalog}?`;

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
    const { data } = await api.get<GuitarType[]>(path);
    dispatch(loadGuitars(data));
    if (
      isAcousticCheck ||
      isElectricCheck ||
      isUkuleleCheck ||
      isFourStringsCheck ||
      isSixStringsCheck ||
      isSevenStringsCheck ||
      isTwelveStringsCheck) {
      dispatch(setPriceRangeMin(data.slice().sort((a, b) => a.price - b.price)[0].price));
      dispatch(setPriceRangeMax(data.slice().sort((a, b) => b.price - a.price)[0].price));
    }
  };

const fetchCommentsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<CommentType[]>(APIRoute.Comments);
    dispatch(loadComments(data));
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
    try {
      const { data, headers } = await api.get<GuitarType[]>(path);
      await
      dispatch(fetchCommentsAction());
      dispatch(loadGuitars(data));
      dispatch(setGuitarsCount(+headers['x-total-count']));
    } catch (error) {
      toast.error('Сервер недоступен');
    }
  };

export {fetchCommentsAction, fetchGuitarsAction, fetchGuitarsOnPageAction};
