import { IGuitarsState } from '../../types/IGuitars';

export const getGuitars = (state: IGuitarsState) => state.guitars;
export const getGuitarsByName = (state: IGuitarsState) => state.guitarsByName;
