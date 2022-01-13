import {ThunkActionResult} from '../types/action';
import {loadCommentsCount, loadCurrentGuitar, loadGuitars, loadCurrentGuitarComments} from './action';
import {APIRoute} from '../const';
import {Guitars, Guitar} from '../types/guitar';
import {Comments} from '../types/comment';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  };

export const fetchCurrentGuitarAction = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${guitarId}`);
    dispatch(loadCurrentGuitar(data));
  };

export const fetchCurrentGuitarCommentsAction = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comments>(`${APIRoute.Guitars}/${guitarId}/${APIRoute.Comments}`);
    dispatch(loadCurrentGuitarComments(data));
  };

export const fetchCommentsCountAction = (guitars: Guitars): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const commentsCount: number[] = [];
    for (let i = 1; i <= guitars.length; i++) {
      const {data} = await api.get<Comments>(`${APIRoute.Guitars}/${i}/${APIRoute.Comments}`);
      commentsCount.push(data.length);
    }
    dispatch(loadCommentsCount(commentsCount));
  };
