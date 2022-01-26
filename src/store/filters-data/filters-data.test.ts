import { DefaultPriceRange } from '../../const';
import { setPriceRangeMax, setPriceRangeMin } from '../action';
import { filtersData } from './filters-data';

describe('Reducer: filtersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filtersData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        priceRangeMin: DefaultPriceRange.Min,
        priceRangeMax: DefaultPriceRange.Max,
      });
  });

  it('should update priceRangeMin by change price range min', () => {
    const state = {
      priceRangeMin: DefaultPriceRange.Min,
      priceRangeMax: DefaultPriceRange.Max,
    };
    expect(filtersData(state, setPriceRangeMin(1000)))
      .toEqual({
        priceRangeMin: 1000,
        priceRangeMax: DefaultPriceRange.Max,
      });
  });

  it('should update priceRangeMax by change price range max', () => {
    const state = {
      priceRangeMin: DefaultPriceRange.Min,
      priceRangeMax: DefaultPriceRange.Max,
    };
    expect(filtersData(state, setPriceRangeMax(1000)))
      .toEqual({
        priceRangeMin: DefaultPriceRange.Min,
        priceRangeMax: 1000,
      });
  });
});
