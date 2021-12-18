import React, { memo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import IGuitar from 'models/guitar';
import { AppRoutes } from 'constants/routes';

type Props = {
  guitar: IGuitar,
}

function ProductCard({ guitar }: Props): JSX.Element {
  const {
    id,
    name,
    rating,
    price,
    previewImg,
  } = guitar;

  //TODO: create logic for retrieving review count from back
  const reviewCount = 9;

  return (
    <div className="product-card">
      <img
        src={previewImg}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {new Array(5)
            .fill(null)
            .map((_value, index) => {
              if ((index + 1) <= Math.round(rating)) {
                return (
                  <svg key={nanoid()} width="12" height="11" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                );
              }

              return (
                <svg key={nanoid()} width="12" height="11" aria-hidden="true">
                  <use xlinkHref="#icon-star"/>
                </svg>
              );
            })}
          <span className="rate__count">{reviewCount}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={AppRoutes.getProductPageLink(id)}>Подробнее</Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="/"
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default memo(ProductCard);
