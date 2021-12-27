import { SortOrder, SortType } from '../const';
import { NameSpace, RootState } from './root-reducer';

const getGuitars = (state: RootState) => state[NameSpace.Data].catalog;
const getDataLoadingStatus = (state: RootState): boolean => state[NameSpace.Data].isDataLoaded;
const getGuitarsCount = (state: RootState): number => state[NameSpace.Data].guitarsCount;
const getSortType = (state: RootState): SortType => state[NameSpace.SearchParameters].sortType;
const getSortOrder = (state: RootState): SortOrder => state[NameSpace.SearchParameters].sortOrder;

export {getGuitars, getDataLoadingStatus, getGuitarsCount, getSortType, getSortOrder};
