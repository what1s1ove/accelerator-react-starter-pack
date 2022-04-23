import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import { Rating } from '../rating/rating';
import styles from './product-item.module.css';

export function ProductItem(props: {
  price: number,
  name: string,
  previewImg: string,
  rating: number,
}) {
  return (
    <div className={styles['product-card']}>
      <img src={props.previewImg} width="75" height="190" alt="СURT Z30 Plus Acoustics" />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={props.rating} />
          <span className="rate__count">9</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{props.name}</p>
        <p className="product-card__price">{props.price} ₽</p>
      </div>
      <div className={styles['product-card__buttons']}>
        <Link to="/">
          <Button isSmallButton title="Подробнее" type="more" />
        </Link>
        <Link to="/">
          <Button isSmallButton title="Купить" type="buy" />
        </Link>
      </div>
    </div>
  );
}
