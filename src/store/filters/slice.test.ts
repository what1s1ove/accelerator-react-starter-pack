import filtersReducer, {
  initialState, loadGuitarsPriceRange, loadGuitarType, loadQuantityOfStrings,
  loadSortingOrder, loadSortingType, removeGuitarType, removeQuantityOfStrings
} from './slice';
import {SortingOrder, SortingType} from '../../constants/sorting';

describe('Filter reducer', () => {
  test('Load sorting type', () => {
    expect(filtersReducer(initialState, loadSortingType(SortingType.Price))).toEqual({
      ...initialState,
      sortingType: SortingType.Price,
    });
  });

  test('Load sorting order', () => {
    expect(filtersReducer(initialState, loadSortingOrder(SortingOrder.Asc))).toEqual({
      ...initialState,
      sortingOrder: SortingOrder.Asc,
    });
  });

  test('Load quantity of strings', () => {
    const strings = '4';
    expect(filtersReducer(initialState, loadQuantityOfStrings(strings))).toEqual({
      ...initialState,
      quantityOfStrings: [...initialState.quantityOfStrings, strings],
    });
  });

  test('Remove quantity of strings', () => {
    const state = {
      ...initialState,
      quantityOfStrings: ['1', '4', '10'],
    };

    const strings = '1';
    expect(filtersReducer(state, removeQuantityOfStrings(strings))).toEqual({
      ...initialState,
      quantityOfStrings: ['4', '10'],
    });
  });

  test('Load guitar type', () => {
    const guitarType = 'acoustic';

    expect(filtersReducer(initialState, loadGuitarType(guitarType))).toEqual({
      ...initialState,
      guitarType: [...initialState.guitarType, guitarType],
    });
  });

  test('Remove guitar type', () => {
    const state = {
      ...initialState,
      guitarType: ['acoustic', 'ukulele'],
    };

    const guitarType = 'acoustic';
    expect(filtersReducer(state, removeGuitarType(guitarType))).toEqual({
      ...initialState,
      guitarType: ['ukulele'],
    });
  });

  test('Load price range', () => {
    const price = {min: 0, max: 100};

    expect(filtersReducer(initialState, loadGuitarsPriceRange(price))).toEqual({
      ...initialState,
      priceRange: price,
    });
  });
});
