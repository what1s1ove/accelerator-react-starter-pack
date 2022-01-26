import { makeFakeGuitars } from '../../utils/mocks';
import { loadGuitarById, loadGuitars } from '../action';
import { guitarData } from './guitar-data';

const guitars = makeFakeGuitars();

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect (guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        catalog: [
          {
            id: 0,
            name: '',
            vendorCode: '',
            type: '',
            description: '',
            previewImg: '',
            stringCount: 0,
            rating: 0,
            price: 0,
          },
        ],
        isDataLoaded: false,
        comments: [],
        guitarsOnPage: [],
        guitar: null,
        commentsByGuitarId: [],
        isCardLoaded: false,
        areCommentsLoaded: false,
      });
  });

  it('should update guitars by loading guitars', () =>{
    const state = {
      catalog: [
        {
          id: 0,
          name: '',
          vendorCode: '',
          type: '',
          description: '',
          previewImg: '',
          stringCount: 0,
          rating: 0,
          price: 0,
        },
      ],
      isDataLoaded: false,
      comments: [],
      guitarsOnPage: [],
      guitar: null,
      commentsByGuitarId: [],
      isCardLoaded: false,
      areCommentsLoaded: false,
    };

    expect (guitarData(state, loadGuitars(guitars)))
      .toEqual({
        catalog: guitars,
        isDataLoaded: true,
        comments: [],
        guitarsOnPage: [],
        guitar: null,
        commentsByGuitarId: [],
        isCardLoaded: false,
        areCommentsLoaded: false,
      });
  });

  it('should update current guitar by loading guitar', () => {
    const state = {
      catalog: [
        {
          id: 0,
          name: '',
          vendorCode: '',
          type: '',
          description: '',
          previewImg: '',
          stringCount: 0,
          rating: 0,
          price: 0,
        },
      ],
      isDataLoaded: false,
      comments: [],
      guitarsOnPage: [],
      guitar: null,
      commentsByGuitarId: [],
      isCardLoaded: false,
      areCommentsLoaded: false,
    };

    expect(guitarData(state, loadGuitarById(guitars[0])))
      .toEqual({
        catalog: [{
          id: 0,
          name: '',
          vendorCode: '',
          type: '',
          description: '',
          previewImg: '',
          stringCount: 0,
          rating: 0,
          price: 0,
        }],
        isDataLoaded: false,
        comments: [],
        guitarsOnPage: [],
        guitar: guitars[0],
        commentsByGuitarId: [],
        isCardLoaded: false,
        areCommentsLoaded: false,
      });
  });
});
