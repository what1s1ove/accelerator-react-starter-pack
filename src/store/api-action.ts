import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { GuitarType } from '../types/guitar';
import { loadGuitars } from './action';

const fetchGuitarsAction = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarType[]>(APIRoute.Catalog);
    dispatch(loadGuitars(data));
  };

const fetchSortedGuitarsAction = (sortType: string, sortOrder: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarType[]>(APIRoute.Sort(sortType, sortOrder));
    dispatch(loadGuitars(data));
  };

export {fetchGuitarsAction, fetchSortedGuitarsAction};
