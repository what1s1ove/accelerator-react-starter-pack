import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './breadcrumbs.module.css';

export function Breadcrumbs(props: {
    className?: string
    items: Array<string>
}) {
  return (
    <ul className={cn(props.className, styles.breadcrumbs)}>
      {props.items.map((item) => (
        <li className={styles['breadcrumbs__item']} key={item}>
          <Link className="link" to="/">{item}</Link>
        </li>
      ))}
    </ul>
  );
}
