import { toast } from 'react-toastify';
import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { GuitarType } from '../types/guitar';
import { loadGuitars } from './action';

const fetchGuitarsAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarType[]>(APIRoute.Catalog);
      dispatch(loadGuitars(data));
    } catch (error) {
      toast.error('Сервер недоступен');
    }
  };

const fetchSortedGuitarsAction = (filterParams: string, sortType: string, sortOrder: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarType[]>(APIRoute.Sort(filterParams, sortType, sortOrder));
    dispatch(loadGuitars(data));
  };

const fetchFilteredGuitarsAction = (searchParams: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarType[]>(APIRoute.Filter(searchParams));
    dispatch(loadGuitars(data));
  };

export {fetchGuitarsAction, fetchSortedGuitarsAction, fetchFilteredGuitarsAction};
