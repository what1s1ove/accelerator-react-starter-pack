import { NameSpace, RootState } from './root-reducer';

const getGuitars = (state: RootState) => state[NameSpace.Data].catalog;

export {getGuitars};
