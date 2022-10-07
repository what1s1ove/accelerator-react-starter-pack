import { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/use-outside-click';
import { Modal } from '../modal';
import { useForm } from '../../hooks/use-form';
import { ICommentPost } from '../../types/IComment';
import { useDispatch } from 'react-redux';
import { sendReviewToGuitar } from '../../store/guitars/slice';
import LockFocus from 'react-focus-lock';

export function AddReviewModal(props: {
  handleModalClose: () => void
  isModalShown: boolean
  guitarName: string
  handleReviewFormSend: () => void
  guitarId: number
}) {
  const dispatch = useDispatch();
  const {values, errors, handleFormSubmit, handleFormChange} = useForm<ICommentPost>(sendForm, {
    userName: {required: {value: true, message: 'Заполните поле'}},
    rating: {required: {value: true, message: 'Поставьте оценку'}},
  });

  function sendForm() {
    dispatch(sendReviewToGuitar({...values, 'guitarId': props.guitarId}));
    props.handleReviewFormSend();
    props.handleReviewFormSend();
  }

  const addReviewModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(addReviewModalRef, props.handleModalClose);

  return (
    <LockFocus>
      <Modal className='modal--review' isModalShown={props.isModalShown} ref={addReviewModalRef}>
        <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
        <h3 className="modal__product-name title title--medium-20 title--uppercase">{props.guitarName}</h3>

        <form className="form-review" onSubmit={handleFormSubmit}>
          <div className="form-review__wrapper">
            <div className="form-review__name-wrapper">
              <label className="form-review__label form-review__label--required" htmlFor="user-name">
              Ваше Имя
              </label>
              <input
                className="form-review__input form-review__input--name"
                onChange={handleFormChange}
                value={values.userName || ''}
                name="userName"
                id="user-name"
                type="text"
                autoComplete="off"
              />

              {errors.userName && <span className="form-review__warning">{errors.userName}</span>}
            </div>
            <div>
              <span className="form-review__label form-review__label--required">
              Ваша Оценка
              </span>
              <div className="rate rate--reverse">
                <input className="visually-hidden" onChange={handleFormChange} type="radio" id="star-5" name="rating" value="5" />
                <label className="rate__label" htmlFor="star-5" title="Отлично" />
                <input className="visually-hidden" onChange={handleFormChange} type="radio" id="star-4" name="rating" value="4" />
                <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                <input className="visually-hidden" onChange={handleFormChange} type="radio" id="star-3" name="rating" value="3" />
                <label className="rate__label" htmlFor="star-3" title="Нормально" />
                <input className="visually-hidden" onChange={handleFormChange} type="radio" id="star-2" name="rating" value="2" />
                <label className="rate__label" htmlFor="star-2" title="Плохо" />
                <input className="visually-hidden" onChange={handleFormChange} type="radio" id="star-1" name="rating" value="1" />
                <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                <span className="rate__count" />

                {errors.rating && <span className="rate__message">{errors.rating}</span>}
              </div>
            </div>
          </div>

          <label className="form-review__label" htmlFor="pros">Достоинства</label>
          <input
            className="form-review__input"
            onChange={handleFormChange}
            value={values.advantage || ''}
            name="advantage"
            id="pros"
            type="text"
            autoComplete="off"
          />

          <label className="form-review__label" htmlFor="cons">Недостатки</label>
          <input
            className="form-review__input"
            onChange={handleFormChange}
            value={values.disadvantage || ''}
            name="disadvantage"
            id="cons"
            type="text"
            autoComplete="off"
          />

          <label className="form-review__label" htmlFor="comment">Комментарий</label>
          <textarea
            className="form-review__input form-review__input--textarea"
            onChange={handleFormChange}
            value={values.comment || ''}
            name="comment"
            id="comment"
            rows={10}
          />

          <button
            className="button button--medium-20 form-review__button"
            type="submit"
          >
          Отправить отзыв
          </button>
        </form>

        <button
          className="modal__close-btn button-cross"
          onClick={props.handleModalClose}
          type="button"
          aria-label="Закрыть"
          data-testid="close-review"
        >
          <span className="button-cross__icon" />
          <span className="modal__close-btn-interactive-area" />
        </button>
      </Modal>
    </LockFocus>
  );
}

AddReviewModal.displayName = 'AddReviewModal';
