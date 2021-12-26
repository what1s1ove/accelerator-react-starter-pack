import {ThunkActionResult} from '../types/action';
import {APIRoute} from '../const/const';
import {GuitarsList} from '../types/guitar';
import {fillGuitarsListAction} from './action';

export const fetchGuitarsList = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarsList>(APIRoute.Guitars);
    dispatch(fillGuitarsListAction(data));
  };

export const sortGuitarsListAction = (sort = 'price', order = 'asc'): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get(APIRoute.Guitars, {
      params: {
        _sort: sort,
        _order: order,
      },
    });
    dispatch(fillGuitarsListAction(data));
  };
