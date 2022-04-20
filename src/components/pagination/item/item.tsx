import styles from './item.module.css';

export function Item(props: {
    pageNumber: number
}) {
  return (
    <button className={styles.item}>
      {props.pageNumber}
    </button>
  );
}
