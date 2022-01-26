import { render, screen } from '@testing-library/react';
import ModalSuccessReview from './modal-success-review';

const onFakeHandleModalClose = jest.fn();

describe('Component: ModalSuccessComment', () => {
  it('should render ModalSuccessComment', () => {
    render(
      <ModalSuccessReview isModalSuccessOpen={false} onSuccessModalClose={onFakeHandleModalClose} />);

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
  });
});
