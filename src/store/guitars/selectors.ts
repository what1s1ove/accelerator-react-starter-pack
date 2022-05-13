import { RootState } from '../store';

export const getGuitars = (state: RootState) => state.guitars.guitars;
export const getFilteredGuitars = (state: RootState) => state.guitars.filteredGuitars;
export const getGuitarsByName = (state: RootState) => state.guitars.guitarsByName;

export const getMinAndMaxGuitarsPrice = (state: RootState) => {
  const min = state.guitars.guitars.slice().sort((a, b) => a.price - b.price)[0]?.price;
  const max = state.guitars.guitars.slice().sort((a, b) => b.price - a.price)[0]?.price;

  return {
    min,
    max,
  };
};
