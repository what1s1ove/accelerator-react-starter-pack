import { setGuitarsCount } from '../action';
import { paginationData } from './pagination-data';

describe('Reducer: pagination', () => {
  it('without additional parameters should return initial state', () => {
    expect(paginationData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitarsCount: 0,
      });
  });

  it('should update guitarsCount by load guitars', () => {
    const state = {
      guitarsCount: 0,
    };
    expect(paginationData(state, setGuitarsCount(1)))
      .toEqual({
        guitarsCount: 1,
      });
  });
});
