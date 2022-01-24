import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAreCommentsLoaded } from '../../store/selectors';
import ModalAddReview from '../modal-add-review/modal-add-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import CommentsList from '../comments-list/comments-list';

type ProductCardCommentsProps = {
  name: string,
  guitarId: string,
}

function ProductCardComments({ name, guitarId }: ProductCardCommentsProps): JSX.Element {
  const isCommentsLoaded = useSelector(getAreCommentsLoaded);
  const [isModalReviewFormOpen, setIsModalReviewFormOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const handleEscapeKeyDown = useCallback((evt: { key: string; }) => {
    if (evt.key === 'Escape') {
      setIsModalReviewFormOpen(false);
      setIsModalSuccessOpen(false);
      document.body.removeEventListener('keydown', handleEscapeKeyDown);
      document.body.classList.remove('unscrollable');
    }
  }, []);

  const handleNewReviewButtonClick = () => {
    document.body.classList.add('unscrollable');
    setIsModalReviewFormOpen(true);
  };

  const onReviewModalClose = () => {
    document.body.classList.remove('unscrollable');
    document.body.removeEventListener('keydown', handleEscapeKeyDown);
    setIsModalReviewFormOpen(false);
  };

  const onSuccessModalClose = () => {
    document.body.classList.remove('unscrollable');
    document.body.removeEventListener('keydown', handleEscapeKeyDown);
    setIsModalSuccessOpen(false);
  };

  const onSuccessModalOpen = () => {
    document.body.classList.add('unscrollable');
    setIsModalSuccessOpen(true);
  };

  useEffect(() => {
    isModalReviewFormOpen ?
      document.body.addEventListener('keydown', handleEscapeKeyDown) :
      document.body.removeEventListener('keydown', handleEscapeKeyDown);
  }, [handleEscapeKeyDown, isModalReviewFormOpen]);

  useEffect(() => {
    isModalSuccessOpen ?
      document.body.addEventListener('keydown', handleEscapeKeyDown) :
      document.body.removeEventListener('keydown', handleEscapeKeyDown);
  }, [handleEscapeKeyDown, isModalSuccessOpen]);

  if (!isCommentsLoaded) {
    return (
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">Отзывы</h3>
        Loading...
      </section>
    );
  }

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button className="button button--red-border button--big reviews__sumbit-button" onClick={handleNewReviewButtonClick}>Оставить отзыв</button>
      <CommentsList />
      {<ModalAddReview guitarId={guitarId} isModalReviewFormOpen={isModalReviewFormOpen} name={name} onReviewModalClose={onReviewModalClose} onSuccessModalOpen={onSuccessModalOpen} />}
      {<ModalSuccessReview isModalSuccessOpen={isModalSuccessOpen} onSuccessModalClose={onSuccessModalClose} />}
    </section>
  );
}

export default ProductCardComments;
