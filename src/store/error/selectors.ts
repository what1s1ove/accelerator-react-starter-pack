import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getErrorMessage = (state: State): string => state[NameSpace.Error].message;
