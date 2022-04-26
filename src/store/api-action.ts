import {ThunkActionResult} from './action-type';
import {loadSelectedGuitar, loadGuitars} from './action';
import {APIRoute} from '../const';
import {Guitar} from '../types/guitar';

const fetchGuitarAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    data.map((item) => item);
    dispatch(loadGuitars(data));
  };

const fetchSelectedGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
    dispatch(loadSelectedGuitar(data));
  };

// const sendInfoUserAction = (id: number, comment: string): ThunkActionResult =>
//   async (dispatch, _getState, api): Promise<void> => {
//     await api.post<User>(`${APIRoute.Users}/${id}`, {comment});
//     dispatch(redirectToRoute(`${APIRoute.Users}/${id}`));
//   };

export {
  fetchGuitarAction,
  fetchSelectedGuitarAction
};
