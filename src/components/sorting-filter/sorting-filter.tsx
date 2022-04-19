import cn from 'classnames';
import styles from './sorting-filter.module.css';

export function SortingFilter(props: {
    isButtonUpActive?: boolean
    isButtonDownActive?: boolean
}) {
  return (
    <div className={styles['catalog-sort']}>
      <h4 className={styles['catalog-sort__title']}>Сортировать:</h4>
      <div className={styles['catalog-sort__type']}>
        <button className={styles['catalog-sort__type-button']} aria-label="по цене" tabIndex={-1}>по цене</button>
        <button className={styles['catalog-sort__type-button']} aria-label="по популярности">по популярности</button>
      </div>
      <div className={styles['catalog-sort__order']}>
        <button
          className={
            cn(
              styles['catalog-sort__order-button'],
              styles['catalog-sort__order-button--up'],
              {
                [styles['catalog-sort__order-button--active']]: props.isButtonUpActive,
              },
            )
          }
          aria-label="По возрастанию"
        />
        <button
          className={
            cn(
              styles['catalog-sort__order-button'],
              styles['catalog-sort__order-button--down'],
              {
                [styles['catalog-sort__order-button--active']]: props.isButtonDownActive,
              },
            )
          }
          aria-label="По убыванию"
        />
      </div>
    </div>
  );
}
