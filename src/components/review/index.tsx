import cn from 'classnames';
import { formatDate } from '../../helpers/format-date';
import { Rating } from '../rating/rating';

export function Review(props: {
  className?: string
  authorName: string
  date: Date
  rating: number
  advantages: string
  disadvantages: string
  comment: string
}) {
  return (
    <div className={cn('review', props.className)}>
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {props.authorName}
        </h4>

        <span className="review__date">
          {formatDate(props.date)}
        </span>
      </div>

      <div className="rate review__rating-panel" aria-hidden="true">
        <span className="visually-hidden">Рейтинг:</span>
        <Rating rating={props.rating || 0} />
      </div>

      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{props.advantages}</p>

      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{props.disadvantages}</p>

      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{props.comment}</p>
    </div>);
}
