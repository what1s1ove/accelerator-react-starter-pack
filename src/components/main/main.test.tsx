import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakePage} from '../../utils/mocks';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Main from './main';
import userEvent from '@testing-library/user-event';

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
    filterPrice: filterPrice,
    filterType: filterType,
    filterString: filterString,
  },
});

describe('Component: Main', () => {
  it('should render correctly', () => {
    async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>);
      expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
      expect(screen.getByText('Фильтр')).toBeInTheDocument();

      userEvent.type(screen.getByTestId('priceMin'), '1000');
      userEvent.type(screen.getByTestId('priceMax'), '5000');
      expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
      expect(screen.getByDisplayValue('5000')).toBeInTheDocument();
    }
  });

  it('should checked when user clicked', () => {
    async () => {
      const {rerender} = render(<Main />);

      const allCheckboxes = await screen.findAllByRole('checkbox');

      for (const checkbox of allCheckboxes) {
        expect(checkbox).not.toBeChecked();
        userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        rerender(<Main />);
      }
    }
  });
});
