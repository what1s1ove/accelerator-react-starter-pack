import { GuitarType } from '../../types/guitar';

const ICON_FULL_STAR = '#icon-full-star';
const ICON_STAR = '#icon-star';

type ProductCardProps = {
  productCard: GuitarType,
};

function ProductCard(props: ProductCardProps): JSX.Element {
  const {name, previewImg, price, rating} = props.productCard;
  const roundedRating = Math.round(rating);
  const imageSrc = `${previewImg.replace('guitar', 'content/guitar')}`;

  return (
    <div className="product-card">
      <img
        src={imageSrc}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={roundedRating >= 1 ? ICON_FULL_STAR : ICON_STAR}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={roundedRating >= 2 ? ICON_FULL_STAR : ICON_STAR}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={roundedRating >= 3 ? ICON_FULL_STAR : ICON_STAR}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={roundedRating >= 4 ? ICON_FULL_STAR : ICON_STAR}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={roundedRating >= 5 ? ICON_FULL_STAR : ICON_STAR}
            />
          </svg>
          <span className="rate__count">9</span>
          <span className="rate__message" />
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          { `${ price } ₽` }
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
