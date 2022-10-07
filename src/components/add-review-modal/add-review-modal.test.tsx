import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AddReviewModal } from '.';
import { mockStore, getMockStore } from '../../helpers/get-mock-store';

const handleModalClose = jest.fn();
const handleReviewFormSend = jest.fn();

describe('AddReviewModal Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = getMockStore();
  });

  test('should be rendered correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddReviewModal
            handleModalClose={handleModalClose}
            isModalShown
            guitarName="Name"
            handleReviewFormSend={handleReviewFormSend}
            guitarId={2}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('should clicked once', () => {
    const isModalShown = false;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddReviewModal
            handleModalClose={handleModalClose}
            isModalShown={isModalShown}
            guitarName="Name"
            handleReviewFormSend={handleReviewFormSend}
            guitarId={2}
          />
        </BrowserRouter>
      </Provider>,
    );
    const button = screen.getByTestId('close-review');
    fireEvent.click(button);
    expect(handleModalClose).toHaveBeenCalledTimes(1);
  });
});
