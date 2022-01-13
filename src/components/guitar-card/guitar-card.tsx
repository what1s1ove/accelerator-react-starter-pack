import {Guitar} from '../../types/guitar';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getPage} from '../../store/guitars-data/selectors';
import {getFilterPrice, getFilterString, getFilterType} from '../../store/guitars-other-data/selectors';

type GuitarCardProps = {
  guitar: Guitar,
  commentCount: number,
  guitarRating: number,
}

function GuitarCard({guitar, commentCount, guitarRating}: GuitarCardProps): JSX.Element {
  const history = useHistory();
  const page = useSelector(getPage);
  const filterPrice = useSelector(getFilterPrice);
  const filterType = useSelector(getFilterType);
  const filterString = useSelector(getFilterString);

  return (
    <div
      className="product-card"
      onClick={() => {
        history.push(`/page-${page}/prices:${Object.values(filterPrice).join(',')};types:${Object.values(filterType).join(',')};strings:${Object.values(filterString).join(',')}/${guitar.id}`);
      }}
    >
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {[1, 2, 3, 4, 5].map((idx) => {
            if (idx > guitarRating) {
              return (
                <svg width="12" height="11" aria-hidden="true" key={idx}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              );
            } else {
              return (
                <svg width="12" height="11" aria-hidden="true" key={idx}>
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
              );
            }
          })}
          <span className="rate__count">{commentCount}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
