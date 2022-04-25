import React from 'react';
import RatingStar from '../rating-star/rating-star';

function ProductCard():JSX.Element {
  return (
    <div className="product-card">
      <img src="img/content/guitar-2.jpg" width="75" height="190" alt="СURT Z30 Plus" />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <RatingStar />
        </div>
        <p className="product-card__title">СURT Z30 Plus</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽</p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
