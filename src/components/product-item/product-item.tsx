import cn from 'classnames';
import { IComment } from '../../types/IComment';
import { Button } from '../button/button';
import { Rating } from '../rating/rating';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/app-route';

export function ProductItem(props: {
  className?: string,
  id: string
  price: number,
  name: string,
  previewImg: string,
  rating: number,
  alt: string
  comments?: Array<IComment>
}) {
  return (
    <div className={cn('product-card', props.className)}>
      <img src={props.previewImg} width="75" height="190" alt={props.alt} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={props.rating} />
          <span className="rate__count">{props.comments?.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{props.name}</p>
        <p className="product-card__price">{props.price} ₽</p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.getGuitar(props.id)}`}>
          Подробнее
        </Link>

        <Button isMiniButton title="Купить" type="buy" />
      </div>
    </div>
  );
}
