import {guitarsOtherData} from './guitars-other-data';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeSortDirection, makeFakeSortTitle, makeFakeCurrentGuitarComment} from '../../utils/mocks';
import {changeFilterPrice, changeFilterString, changeFilterType, changeSortDirection, changeSortTitle, loadCommentsCount, loadCurrentGuitarComments} from '../action';

const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const sortTitle = makeFakeSortTitle();
const sortDirection = makeFakeSortDirection();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const currentGuitarComments = [...new Array(20)].map(() => makeFakeCurrentGuitarComment(1));

describe('Reducer: guitarsOtherData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsOtherData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        commentsCount: [],
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should update all comments count by load all comments count', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, loadCommentsCount(commentsCount)))
      .toEqual({
        commentsCount,
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change sort title by change sort title', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeSortTitle(sortTitle)))
      .toEqual({
        commentsCount: [],
        currentGuitarComments: [],
        sortTitle,
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change sort direction by change sort direction', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeSortDirection(sortDirection)))
      .toEqual({
        commentsCount: [],
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection,
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change filter price by change filter price', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeFilterPrice(filterPrice)))
      .toEqual({
        commentsCount: [],
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice,
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change filter type by change filter type', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeFilterType(filterType)))
      .toEqual({
        commentsCount: [],
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType,
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change filter string by change filter string', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeFilterString(filterString)))
      .toEqual({
        commentsCount: [],
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString,
      });
  });

  it('should load current guitar comments by load current guitar comments', () => {
    const state = {
      commentsCount: [],
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, loadCurrentGuitarComments(currentGuitarComments)))
      .toEqual({
        commentsCount: [],
        currentGuitarComments,
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });
});
