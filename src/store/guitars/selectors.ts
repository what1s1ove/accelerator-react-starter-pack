import { RootState } from '../store';

export const getGuitars = (state: RootState) => state.guitars.guitars;
export const getGuitarsByName = (state: RootState) => state.guitars.guitarsByName;
