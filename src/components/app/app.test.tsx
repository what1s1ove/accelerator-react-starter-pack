import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import App from './app';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakePage} from '../../utils/mocks';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const currentGuitar = makeFakeGuitar(1);
const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const page = makeFakePage();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();

const store = mockStore({
  GUITARS: {
    guitars: guitars,
    currentGuitar: currentGuitar,
    guitarsRating: [],
    page: page,
    isDataLoaded: true,
  },
  GUITARS_OTHER: {
    commentsCount: commentsCount,
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
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push('/');
    render(fakeApp);

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to or "/page-:pageNumber"', () => {
    history.push(`/page-${page}`);
    render(fakeApp);

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to or "/page-:pageNumber/:filters"', () => {
    history.push(`/page-${page}/prices=${Object.values(filterPrice).join('_')};type=${Object.values(filterType).join('_')};strings=${Object.values(filterString).join('_')}`);
    render(fakeApp);

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });

  it('should render "GuitarPage" when user navigate to "/guitar/:guitarId"', () => {
    const testFunc = async () => {
      history.push(`/guitar/${currentGuitar.id}`);
      render(fakeApp);

      const text1 = await screen.findByText('Товар');
      expect(text1).toBeInTheDocument();
      const text2 = await screen.findByText('Отзывы');
      expect(text2).toBeInTheDocument();
    };
    testFunc();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const testFunc = async () => {
      history.push('/non-existent-route');
      render(fakeApp);

      const text1 = await screen.findByText('404. Page not found');
      expect(text1).toBeInTheDocument();
      const text2 = await screen.findByText('Вернуться на главную');
      expect(text2).toBeInTheDocument();
    };
    testFunc();
  });
});
