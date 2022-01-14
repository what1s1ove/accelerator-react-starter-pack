import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { RootState } from '../../store/root-reducer';
import { getCommentsCount } from '../../store/selectors';
import { GuitarType } from '../../types/guitar';
import { setRatingStars } from '../../utils/utils';

type ProductCardProps = {
  productCard: GuitarType,
};

function ProductCard(props: ProductCardProps): JSX.Element {
  const {name, previewImg, price, rating, id} = props.productCard;
  const roundedRating = Math.round(rating);
  const imageSrc = `${previewImg.replace('guitar', 'content/guitar')}`;
  const commentsCount = useSelector((state: RootState) => getCommentsCount(state, id));

  return (
    <div className="product-card">
      <img
        src={`/${ imageSrc }`}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={setRatingStars(roundedRating, 1)}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={setRatingStars(roundedRating, 2)}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={setRatingStars(roundedRating, 3)}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={setRatingStars(roundedRating, 4)}
            />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use
              xlinkHref={setRatingStars(roundedRating, 5)}
            />
          </svg>
          <span className="rate__count">{commentsCount}</span>
          <span className="rate__message" />
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          { `${ price } ₽` }
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={generatePath(AppRoute.Guitar, {id: id})} className="button button--mini" href="#">Подробнее</Link>
        <Link to={AppRoute.PageNotFound} className="button button--red button--mini button--add-to-cart" href="#">Купить</Link>
      </div>
    </div>
  );
}

export default ProductCard;
