import { ApiRoute } from '../components/consts/api';
import { ThunkActionResult } from '../types/actions';
import { Guitar } from '../types/shop-types';
import { updateGuitars, uploadGuitars } from './actions';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Guitar[]>(ApiRoute.Guitars);
    dispatch(uploadGuitars(data));
    dispatch(updateGuitars(data));
  };

export {
  fetchGuitarsAction
};

