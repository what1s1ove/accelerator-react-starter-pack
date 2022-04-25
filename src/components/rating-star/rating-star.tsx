import React from 'react';

function RatingStar():JSX.Element {
  //product-card__rate = 12
  //product-container__rating = 14
  //review__rating-panel = 16
  return (
    <>
      <span className="visually-hidden">Рейтинг:</span>
      <svg width="12" height="11" aria-hidden="true"><use xlinkHref="#icon-full-star"></use></svg>
      <svg width="12" height="11" aria-hidden="true"><use xlinkHref="#icon-full-star"></use></svg>
      <svg width="12" height="11" aria-hidden="true"><use xlinkHref="#icon-full-star"></use></svg>
      <svg width="12" height="11" aria-hidden="true"><use xlinkHref="#icon-full-star"></use></svg>
      <svg width="12" height="11" aria-hidden="true"><use xlinkHref="#icon-star"></use></svg>
      <span className="rate__count">76</span><span className="rate__message"></span>
    </>
  );
}

export default RatingStar;
