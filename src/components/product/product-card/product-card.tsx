import { Guitar } from '../../../types/shop-types';
import { translateNameOfGuitar } from '../../../utils/utils';

type ProductProps = {
  guitar: Guitar,
}

function ProductCard({ guitar }: ProductProps) {


  return (
    <div>
      <div className="product-card"><img src={guitar?.previewImg} width="75" height="190" alt="СURT Z30 Plus Acoustics" />
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span className="rate__count">9 {guitar?.rating}</span><span className="rate__message"></span>
          </div>
          <p className="product-card__title">{guitar?.name} {translateNameOfGuitar(guitar?.type)}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar?.price.toLocaleString()} ₽
          </p>
        </div>
        <div className="product-card__buttons"><a className="button button--mini" href={`/guitars/${guitar?.id}`} >Подробнее</a><a className="button button--red button--mini button--add-to-cart" href='/'>Купить</a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
