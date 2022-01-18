import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeGuitarItem } from '../../utils/mocks';
import Rating from './rating';
import { AppRoute } from '../../const';
const fakeGuitarItem = makeFakeGuitarItem();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore();
const history = createMemoryHistory();

describe('Component: Rating', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Product.replace(':id', fakeGuitarItem.id.toString()));
    render(
      <Provider store={store}>
        <Router history={history}>
          <Rating rating={fakeGuitarItem.rating} width={12} height={12}/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('Rating')).toBeInTheDocument();
  });
});
