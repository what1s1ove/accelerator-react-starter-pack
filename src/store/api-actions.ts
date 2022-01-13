import { toast } from 'react-toastify';
import { APIRoute, AppRoute, FetchStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';
import { loadComments, loadGuitars, loadGuitarsCount, redirectToRoute, setCatalogFetchStatusAction } from './action';

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

const fetchFilteredGuitarsAction = (filterParams: string, sortType: string, sortOrder: string, pageNumber: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCatalogFetchStatusAction(FetchStatus.InProgress));
    try {
      const {data} = await api.get<GuitarType[]>(APIRoute.FilterQuery(filterParams, sortType, sortOrder, pageNumber));
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

export {fetchGuitarsAction, fetchFilteredGuitarsAction, fetchGuitarsCountAction};
