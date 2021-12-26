import {GuitarsList} from './guitar';
import {RootState} from '../store/root-reducer';
import {Sort} from './sort';

export type MainData = {
  guitarsList: GuitarsList,
  sortByType: Sort,
  sortByIncrease: Sort,
  isDataLoaded: boolean,
};

export type State = RootState;
