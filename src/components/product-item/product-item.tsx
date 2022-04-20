import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import { Rating } from '../rating/rating';
import styles from './product-item.module.css';

export function ProductItem() {
  return (
    <div className={styles['product-card']}>
      <img src="/img/guitar-2.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating />
          <span className="rate__count">9</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">СURT Z30 Plus Acoustics</p>
        <p className="product-card__price">
          129 500 ₽
        </p>
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
