import { Link } from 'react-router-dom';
import { capitalize, formatNumber } from '../../utils/utils';
import Rating from '../rating/rating';
import { GuitarItemProps } from './types';

function GuitarItem({guitar}: GuitarItemProps): JSX.Element {
  return (
    <div className="product-card">
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
        <Rating rating={guitar.rating} />
        <p className="product-card__title">{guitar.name} {capitalize(guitar.type)}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatNumber(guitar.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to="#">Подробнее</Link><Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>
      </div>
    </div>
  );
}

export default GuitarItem;
