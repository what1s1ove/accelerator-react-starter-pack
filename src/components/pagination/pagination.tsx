import { Item } from './item/item';
import styles from './pagination.module.css';

const pages = [1, 2, 3];

export function Pagination(props: {
    className?: string
}) {
  return (
    <div className={props.className}>
      <ul className={styles.list}>
        {pages.map((item) => (
          <li key={item}>
            <Item pageNumber={item} />
          </li>
        ))}
        <li>
          <button className={styles['list__next-button']}>
            Далее
          </button>
        </li>
      </ul>
    </div>
  );
}
