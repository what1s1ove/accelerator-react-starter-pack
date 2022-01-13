import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakePage} from '../../utils/mocks';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Header from './header';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../const';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const currentGuitar = makeFakeGuitar(1);
const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const page = makeFakePage();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        guitars: guitars,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);
      expect(screen.getByText('О компании')).toBeInTheDocument();
      expect(screen.getByLabelText('Поиск')).toBeInTheDocument();

      userEvent.type(screen.getByTestId('search'), 'guitar');

      expect(screen.getByDisplayValue('guitar')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    const store = mockStore({
      GUITARS: {
        guitars: guitars,
      },
    });
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('logo'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

  it('should redirect to guitar page when user clicked to link', () => {
    async () => {
    const store = mockStore({
      GUITARS: {
        guitars: guitars,
        currentGuitar: currentGuitar,
        guitarsRating: [],
        page: page,
      },
      GUITARS_OTHER: {
        commentsCount: commentsCount,
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice,
        filterType,
        filterString,
      },
    });
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.GuitarPage}>
              <h1>Mock Guitar Page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>);
      expect(screen.queryByText('Mock Guitar Page')).not.toBeInTheDocument();
      const guitarCards = await screen.findAllByTestId('select-item');
      for (const card of guitarCards) {
        userEvent.click(card);
        expect(screen.queryByText('Mock Guitar Page')).toBeInTheDocument();
      }
    }
  });
});
