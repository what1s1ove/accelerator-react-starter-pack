import { Icon } from '../icon/icon';
import { Modal } from '../modal';
import sprite from '../../assets/sprite.svg';
import { useOnClickOutside } from '../../hooks/use-outside-click';
import { useRef } from 'react';
import LockFocus from 'react-focus-lock';

export function SuccessReviewModal(props: {
  handleModalClose: () => void
  isModalShown: boolean
}) {
  const successReviewModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(successReviewModalRef, props.handleModalClose);

  return (
    <LockFocus>
      <Modal className="modal--success" isModalShown={props.isModalShown} ref={successReviewModalRef}>
        <Icon className="modal__icon" width="26" height="20" name={`${sprite}#icon-success`} />
        <p className="modal__message">Спасибо за ваш отзыв!</p>
        <div className="modal__button-container modal__button-container--review">
          <button
            className="button button--small modal__button modal__button--review"
            onClick={props.handleModalClose}
          >
            К покупкам!
          </button>
        </div>
        <button
          className="modal__close-btn button-cross"
          onClick={props.handleModalClose}
          type="button"
          aria-label="Закрыть"
        >
          <span className="button-cross__icon" />
          <span className="modal__close-btn-interactive-area" />
        </button>
      </Modal>
    </LockFocus>
  );
}
