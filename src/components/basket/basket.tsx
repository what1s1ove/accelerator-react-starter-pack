import cn from 'classnames';
import { Icon } from '../icon/icon';
import { Link } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import { AppRoute } from '../../constants/app-route';

export function Basket(props: {
    className?: string
}) {
  return (
    <Link className={cn('header__cart-link', props.className)} to={AppRoute.Basket} aria-label="Корзина">
      <Icon className="header__cart-icon" name={`${sprite}#basket`} width="14" height="14" aria-hidden="true" />
      <span className="visually-hidden">Перейти в корзину</span>
      <span className="header__cart-count">0</span>
    </Link>
  );
}
