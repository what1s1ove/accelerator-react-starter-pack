import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';
import { setComments, setGuitar, setGuitars } from './action';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    dispatch(setGuitars(data));
  };

export const fetchGuitarItemAction = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar + guitarId);
    dispatch(setGuitar(data));
  };
export const fetchCommentsAction = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(APIRoute.Guitar + guitarId + APIRoute.Comments);
    dispatch(setComments(data, guitarId));
  };
