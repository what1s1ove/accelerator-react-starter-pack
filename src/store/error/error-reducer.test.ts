import { getFakeErrorMessage } from '../../utils/mocks';
import { setErrorMessage } from '../action';
import { errorReducer } from './error-reducer';

const fakeErrorMessage = getFakeErrorMessage();
describe('Reducer: errorReducer', () => {
  it('should not be displayed', () => {
    const state = {
      message: fakeErrorMessage,
    };
    expect(errorReducer(state, setErrorMessage('')))
      .toEqual({
        message: '',
      });
  });
  it('should render correctly', () => {
    const state = {
      message: '',
    };
    expect(errorReducer(state, setErrorMessage(fakeErrorMessage)))
      .toEqual({
        message: fakeErrorMessage,
      });
  });
});
