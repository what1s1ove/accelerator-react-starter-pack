import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import { RootState } from '../../store/root-reducer';
import ModalAddReview from './modal-add-review';

const onFakeHandleModalClose = jest.fn();
const onFakeHandleModalOpen = jest.fn();
const middlewares = [thunk.withExtraArgument(createAPI)];
const mockStore = configureMockStore<
  RootState,
  Action,
  ThunkDispatch<RootState, typeof createAPI, Action>
>(middlewares);

const store = mockStore({
});

describe('Component: ModalAddReview', () => {
  it('should render ModalAddReview', () => {
    render(
      <Provider store={store}>
        <ModalAddReview isModalReviewFormOpen={false} name={'Guitar'} guitarId={''} onReviewModalClose={onFakeHandleModalClose} onSuccessModalOpen={onFakeHandleModalOpen} />
      </Provider>);

    expect(screen.getByText(/Guitar/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
  });
});
