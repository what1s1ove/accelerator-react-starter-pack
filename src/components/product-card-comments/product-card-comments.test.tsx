import { createAPI } from '../../services/api';
import { Provider } from 'react-redux';
import { makeFakeComments, makeFakeGuitars } from '../../utils/mocks';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/root-reducer';
import { AnyAction } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import ProductCardComments from './product-card-comments';

const guitars = makeFakeGuitars();
const comments = makeFakeComments();
const middlewares = [thunk.withExtraArgument(createAPI)];
const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
const store = mockStore({
  DATA: {
    catalog: guitars,
    isDataLoaded: true,
    comments: comments,
    guitarsOnPage: guitars,
    guitar: guitars[0],
    commentsByGuitarId: comments,
    isCardLoaded: true,
    areCommentsLoaded: true,
  },
  PAGINATION: {
    guitarsCount: 0,
  },
});

describe('Component: ProductCardComments', () => {

  it('should render ProductCardComments', () => {
    render(
      <Provider store={store}>
        <ProductCardComments name={''} guitarId={''} />
      </Provider>);

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(comments[0].userName)).toBeInTheDocument();
    expect(screen.getByText(comments[0].advantage)).toBeInTheDocument();
    expect(screen.getByText(comments[0].disadvantage)).toBeInTheDocument();
    expect(screen.getByText(comments[0].comment)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
  });
});
