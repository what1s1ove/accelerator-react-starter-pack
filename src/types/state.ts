import {GuitarsList} from './guitar';
import {RootState} from '../store/root-reducer';

export type MainData = {
  guitarsList: GuitarsList,
  isDataLoaded: boolean,
};

export type State = RootState;
