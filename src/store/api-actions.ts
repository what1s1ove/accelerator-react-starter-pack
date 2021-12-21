import {ThunkActionResult} from '../types/action';
import {APIRoute} from '../const/const';
import {GuitarsList} from '../types/guitar';
import {fillGuitarsList} from './action';

export const fetchGuitarsList = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarsList>(APIRoute.Guitars);
    dispatch(fillGuitarsList(data));
  };
