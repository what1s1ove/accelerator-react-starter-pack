import { makeFakeGuitars } from '../../utils/mocks';
import { loadGuitars, loadGuitarsCount } from '../action';
import { guitarData } from './guitar-data';

const guitars = makeFakeGuitars();

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect (guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({catalog: [{description: '', id: 0, name: '', previewImg: '', price: 0, rating: 0, stringCount: 0, type: '', vendorCode: ''}], guitarsCount: 0, isDataLoaded: false});
  });

  it('should update guitars by loading guitars', () =>{
    const state = {catalog: [{description: '', id: 0, name: '', previewImg: '', price: 0, rating: 0, stringCount: 0, type: '', vendorCode: ''}], guitarsCount: 0, isDataLoaded: false};
    expect (guitarData(state, loadGuitars(guitars)))
      .toEqual({catalog: guitars, guitarsCount: 0, isDataLoaded: true});
  });

  it('should update guitars count by load guitars', () => {
    const state = {catalog: [{description: '', id: 0, name: '', previewImg: '', price: 0, rating: 0, stringCount: 0, type: '', vendorCode: ''}], guitarsCount: 0, isDataLoaded: false};
    expect(guitarData(state, loadGuitarsCount(guitars)))
      .toEqual({catalog: [{description: '', id: 0, name: '', previewImg: '', price: 0, rating: 0, stringCount: 0, type: '', vendorCode: ''}], guitarsCount: guitars.length, isDataLoaded: false});
  });
});
