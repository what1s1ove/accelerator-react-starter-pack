import { RootState } from '../store';

export const getGuitars = (state: RootState) => state.guitars.guitars;
export const getFilteredGuitars = (state: RootState) => state.guitars.filteredGuitars;
export const getGuitarsByName = (state: RootState) => state.guitars.guitarsByName;
export const getGuitarById = (state: RootState) => state.guitars.guitarById;

export const getMinAndMaxGuitarsPrice = (state: RootState) => ({
  min: state.guitars.guitars.slice().sort((a, b) => a.price - b.price)[0]?.price,
  max: state.guitars.guitars.slice().sort((a, b) => b.price - a.price)[0]?.price,
});

export const getStringsForChosenGuitars = (state: RootState) => {
  const filteredGuitars = state.guitars.guitars.filter((guitar) => state.filters.guitarType.includes(guitar.type));
  const stringsForChosenGuitars = [...new Set(filteredGuitars.map((guitar) => guitar.stringCount))];
  return stringsForChosenGuitars;
};

export const getGuitarsForChosenStrings = (state: RootState) => {
  const filteredGuitars = state.guitars.guitars.filter((guitar) => state.filters.quantityOfStrings.includes(guitar.stringCount.toString()));
  const guitarsForChosenStrings = [...new Set(filteredGuitars.map((guitar) => guitar.type))];
  return guitarsForChosenStrings;
};
