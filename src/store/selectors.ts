import { createSelector } from 'reselect';
import { NameSpace, RootState } from './root-reducer';

const getGuitars = (state: RootState) => state[NameSpace.Data].catalog;
const getDataLoadingStatus = (state: RootState): boolean => state[NameSpace.Data].isDataLoaded;
const getGuitarsCount = (state: RootState): number => state[NameSpace.Pagination].guitarsCount;

const getCommentsCount = createSelector(
  [
    (state: RootState) => state[NameSpace.Data].comments,
    (_state: RootState, currentGuitarId: number) => currentGuitarId,
  ],
  (comments, currentGuitarId) => {
    const guitarComments = comments.filter((comment) => comment.guitarId === currentGuitarId);
    return guitarComments.length;
  });

export const getPriceRangeMin = (state: RootState): number => state[NameSpace.SearchParameters].priceRangeMin;
export const getPriceRangeMax = (state: RootState): number => state[NameSpace.SearchParameters].priceRangeMax;


export {getGuitars, getDataLoadingStatus, getGuitarsCount, getCommentsCount};
