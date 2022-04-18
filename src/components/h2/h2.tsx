import styles from './h2.module.css';

export function H2(props: {
    title: string
}) {
  return (
    <h2 className={styles.title}>{props.title}</h2>
  );
}
