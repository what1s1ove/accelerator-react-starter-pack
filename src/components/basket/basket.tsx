import cn from 'classnames';
import { Icon } from '../icon/icon';
import { Link } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import styles from './basket.module.css';

export function Basket(props: {
    className?: string
}) {
  return (
    <div className={cn(styles.container, props.className)}>
      <div className={styles['items-container']}>
        <span className={styles.items}>2</span>
      </div>
      <Link to="/basket">
        <Icon name={`${sprite}#basket`} color="#ffffff" width="14" height="14" />
      </Link>
    </div>
  );
}
