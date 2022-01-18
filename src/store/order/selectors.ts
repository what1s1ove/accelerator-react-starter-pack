import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getModal = (state: State): Guitar | null => state[NameSpace.Order].modal;
