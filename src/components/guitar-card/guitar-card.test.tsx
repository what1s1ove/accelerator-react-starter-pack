import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakeGuitarRating, makeFakePage} from '../../utils/mocks';
import GuitarCard from './guitar-card';
import userEvent from '@testing-library/user-event';
import Main from '../main/main';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const currentGuitar = makeFakeGuitar(1);
const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const guitarsRating = [...new Array(20)].map(() => makeFakeGuitarRating());
const page = makeFakePage();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        currentGuitar: currentGuitar,
        page: page,
      },
      GUITARS_OTHER: {
        commentsCount: commentsCount,
        filterPrice: filterPrice,
        filterType: filterType,
        filterString: filterString,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCard
            guitar={currentGuitar}
            key={currentGuitar.id}
            commentCount={commentsCount[currentGuitar.id - 1]}
            guitarRating={guitarsRating[currentGuitar.id - 1]}
          />);
        </Router>
      </Provider>);
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });

  it('when user click on component should redirect', () => {
    const store = mockStore({
      GUITARS: {
        currentGuitar: currentGuitar,
        page: page,
      },
      GUITARS_OTHER: {
        commentsCount: commentsCount,
        filterPrice: filterPrice,
        filterType: filterType,
        filterString: filterString,
      },
    });
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={`/page-${page}/prices:${Object.values(filterPrice).join(',')};types:${Object.values(filterType).join(',')};strings:${Object.values(filterString).join(',')}`} component={Main}/>
            <Route exact path={`/page-${page}/prices:${Object.values(filterPrice).join(',')};types:${Object.values(filterType).join(',')};strings:${Object.values(filterString).join(',')}/${currentGuitar.id}`}>
              <h1>Mock Guitar Page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('Mock Guitar Page')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('div'));
    expect(container.querySelectorAll('.product-card')).toBeInTheDocument();
  });
});
