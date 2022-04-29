import cn from 'classnames';
import { InputSearch } from '../input-search/input-search';
import { Logo } from '../logo/logo';
import { Basket } from '../basket/basket';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { AppRoutes } from '../../constants/app-routes';

const LINKS = [
  {
    title: 'Каталог',
    link: AppRoutes.getCatalog('1'),
  },
  {
    title: 'Где купить?',
    link: AppRoutes.Address,
  },
  {
    title: 'О компании',
    link: AppRoutes.About,
  },
];

export function Header(props: {
    className?: string
}) {
  return (
    <header className={cn(styles.header, props.className)}>
      <div className={styles['header__container']}>
        <Logo />

        <ul className={styles['header__list']}>
          {LINKS.map((item) => (
            <li className={styles['header__list-item']} key={item.title}>
              <Link to={item.link}>{item.title}</Link>
            </li>))}
        </ul>

        <InputSearch />
        <Basket />
      </div>
    </header>);
}
