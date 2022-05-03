import { RootState } from '../store';

export const getGuitars = (state: RootState) => state.guitars.guitars;
export const getFilteredGuitars = (state: RootState) => state.guitars.filteredGuitars;
export const getGuitarsByName = (state: RootState) => state.guitars.guitarsByName;
