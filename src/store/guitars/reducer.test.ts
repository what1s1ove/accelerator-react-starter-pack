import { getMockGuitars } from '../../helpers/get-mock-guitars';
import { loadGuitars } from './action';
import { guitarsReducer, initialState } from './reducer';

describe('Guitars reducer', () => {
  test('Load guitars', () => {
    const guitars = getMockGuitars();
    expect(guitarsReducer(initialState, loadGuitars(guitars))).toEqual({
      ...initialState,
      guitars,
    });
  });
});
