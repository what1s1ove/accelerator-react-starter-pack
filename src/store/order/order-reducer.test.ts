import { makeFakeGuitarItem } from '../../utils/mocks';
import { closeModal, openModal } from '../action';
import { orderReducer } from './order-reducer';

const fakeGuitarItem = makeFakeGuitarItem();
describe('Reducer: orderReducer', () => {
  it('should open modal', () => {
    const state = {
      modal: null,
    };
    expect(orderReducer(state, openModal(fakeGuitarItem)))
      .toEqual({
        modal: fakeGuitarItem,
      });
  });
  it('should close modal', () => {
    const state = {
      modal: fakeGuitarItem,
    };
    expect(orderReducer(state, closeModal()))
      .toEqual({
        modal: null,
      });
  });
});
