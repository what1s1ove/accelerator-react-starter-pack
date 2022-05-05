import { getMockGuitars } from '../../helpers/get-mock-guitars';
import guitarsReducer, { initialState, loadGuitars } from './slice';

describe('Guitars reducer', () => {
  test('Load guitars', () => {
    const guitars = getMockGuitars();
    expect(guitarsReducer(initialState, loadGuitars(guitars))).toEqual({
      ...initialState,
      guitars,
    });
  });
});
