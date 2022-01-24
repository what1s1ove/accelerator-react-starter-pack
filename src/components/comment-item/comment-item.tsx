import { CommentType } from '../../types/comment';
import { setRatingStars } from '../../utils/utils';

type CommentItemProps = {
  review: CommentType
}

function CommentItem({ review }: CommentItemProps): JSX.Element {
  const {userName, advantage, disadvantage, comment, rating, createAt} = review;

  const commentDate = new Date(createAt);
  const roundedRating = Math.round(rating);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">
          {
            commentDate
              .toLocaleString('ru', {
                day: 'numeric',
                month: 'long',
              })
          }
        </span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <svg width="16" height="16" aria-hidden="true">
          <use
            xlinkHref={setRatingStars(roundedRating, 1)}
          />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use
            xlinkHref={setRatingStars(roundedRating, 2)}
          />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use
            xlinkHref={setRatingStars(roundedRating, 3)}
          />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use
            xlinkHref={setRatingStars(roundedRating, 4)}
          />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use
            xlinkHref={setRatingStars(roundedRating, 5)}
          />
        </svg>
        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default CommentItem;
