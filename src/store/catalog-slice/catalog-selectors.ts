import StoreSlice from 'constants/store-slice';
import IGuitar from 'models/guitar';
import { RootState } from 'store/store';


const getGuitars = (state: RootState): IGuitar[] =>
  state[StoreSlice.Catalog].guitars;
const getGuitarsLoading = (state: RootState): boolean =>
  state[StoreSlice.Catalog].guitarsLoading;

export {
  getGuitars,
  getGuitarsLoading
};
