import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';
import { setComments, setGuitar, setGuitars } from './action';
import { NameSpace } from './root-reducer';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const state = _getState();
    const {data} = await api.get<Guitar[]>(
      APIRoute.Guitars, {
        params: {
          _embed: 'comments',
          'name_like': state[NameSpace.Guitars].searchString,
          type: state[NameSpace.Guitars].typeGuitars,
          _order: state[NameSpace.Guitars].sortOrder,
          _sort: state[NameSpace.Guitars].sortType,
          'price_gte': state[NameSpace.Guitars].priceFrom,
          'price_lte': state[NameSpace.Guitars].priceTo,
          stringCount: state[NameSpace.Guitars].numberStrings,
        },
      },
    );
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
