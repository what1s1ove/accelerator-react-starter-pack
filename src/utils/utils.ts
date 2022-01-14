import { filtersByStringAndType, PAGES_COUNT, PRODUCTS_PER_PAGE } from '../const';
import { GuitarType } from '../types/guitar';

const ICON_FULL_STAR = '#icon-full-star';
const ICON_STAR = '#icon-star';

const setRatingStars = (rating: number, rateCount: number): string =>
  rating >= rateCount ? ICON_FULL_STAR : ICON_STAR;

const getGuitarPrices = (guitars: GuitarType[]) => [...new Set(guitars.map((guitar) => guitar.price))];

const getMinPrice = (guitars: GuitarType[]) => Math.min(...getGuitarPrices(guitars));

const getMaxPrice = (guitars: GuitarType[]) => Math.max(...getGuitarPrices(guitars));

const getElementIdByStrings = (stringsCount: number) => (filtersByStringAndType.find((element) => element.value === stringsCount))?.elementId;

const matchStringsWithType = (guitarTypes: string[]) => {
  const stringsValues: number[] = [];

  guitarTypes.forEach((type) => {
    filtersByStringAndType.forEach((element) => {

      if (element.guitarTypes.includes(type)){
        stringsValues.push(element.value);
      }
    });
  });

  return [...new Set(stringsValues)];
};

const getStringsByElementId = (elementId: string) => (filtersByStringAndType.find((element) => element.elementId === elementId))?.value;

const getFirstPage = (initialPage: number) => (Math.ceil(initialPage / PAGES_COUNT) - 1) * PAGES_COUNT + 1;
const getPageCount = (guitarsCount: number) => Math.ceil(guitarsCount / PRODUCTS_PER_PAGE);

// const getRestOfGuitars = (guitarsCount: number, pageNumber: number) => guitarsCount - (getFirstPage(pageNumber) + PAGES_COUNT - 1) * PRODUCTS_PER_PAGE;

const getAvailableStringCountId = (availableStringCount: number[]) => availableStringCount.map((element) => getElementIdByStrings(element));

export {setRatingStars, getMinPrice, getMaxPrice, getElementIdByStrings, matchStringsWithType, getStringsByElementId, getFirstPage, getPageCount, getAvailableStringCountId};
