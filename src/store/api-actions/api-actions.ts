import { toast } from 'react-toastify';
import { ApiRoute } from '../../components/consts/api';
import { ThunkActionResult } from '../../types/actions';
import { Comment, Guitar } from '../../types/shop-types';
import { updateGuitars, uploadComments, uploadGuitars } from '../actions';

const DATA_LOAD_FAIL_MESSAGE = 'Не удалось загрузить данные';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Guitar[]>(ApiRoute.Guitars);
      dispatch(uploadGuitars(data));
      dispatch(updateGuitars(data));
    } catch {
      toast.info(DATA_LOAD_FAIL_MESSAGE);

    }
  };

const fetchGuitarCommentsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Comment[]>(ApiRoute.Comments);
    dispatch(uploadComments(data));
  };

export {
  fetchGuitarsAction,
  fetchGuitarCommentsAction
};

