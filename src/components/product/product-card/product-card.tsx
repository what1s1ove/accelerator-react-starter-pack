import React from 'react';
import { useSelector } from 'react-redux';
import { Comment, Guitar } from '../../../types/shop-types';
import { State } from '../../../types/state';
import uniqid from 'uniqid';

type ProductProps = {
  guitar: Guitar,
}

function ProductCard({ guitar }: ProductProps) {

  const comments = useSelector<State, Comment[]>((state) => state.comments);
  const currentComments = comments.filter((comment) => comment.guitarId === guitar.id);

  return (

    <div className="product-card"><img src={guitar?.previewImg} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {new Array(Math.floor(guitar.rating)).fill('').map(() => (
            <svg width="12" height="11" aria-hidden="true" key={uniqid()}>
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          ),

          )}
          {Math.floor(guitar.rating) < 5 ? new Array(5 - Math.floor(guitar.rating)).fill('').map(() => (
            <svg width="12" height="11" aria-hidden="true" key={uniqid()}>
              <use xlinkHref="#icon-star"></use>
            </svg>)) : null}

          <span className="rate__count">{currentComments.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar?.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar?.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href={`/guitars/${guitar?.id}`} >Подробнее</a><a className="button button--red button--mini button--add-to-cart" href='/'>Купить</a>
      </div>
    </div>

  );
}

export default React.memo(ProductCard);
