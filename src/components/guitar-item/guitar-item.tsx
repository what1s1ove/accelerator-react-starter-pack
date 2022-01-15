import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchCommentsAction } from '../../store/api-actions';
import { getCommentsCount } from '../../store/guitars/selectors';
import { capitalize, formatNumber } from '../../utils/utils';
import Rating from '../rating/rating';
import { GuitarItemProps } from './types';

function GuitarItem({guitar}: GuitarItemProps): JSX.Element {
  const commentsCount = useSelector(getCommentsCount)[guitar.id.toString()];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommentsAction(guitar.id.toString()));
  }, [dispatch, guitar]);

  return (
    <div className="product-card">
      <img src={`/${guitar.previewImg}`} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <Rating rating={guitar.rating} width={12} height={11}/>
          <span className="rate__count">{commentsCount}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name} {capitalize(guitar.type)}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formatNumber(guitar.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={AppRoute.Product.replace(':id', guitar.id.toString())}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>
      </div>
    </div>
  );
}

export default GuitarItem;
