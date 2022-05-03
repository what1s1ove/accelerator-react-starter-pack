import styles from './h3.module.css';

export function H3(props: {
    title: string
}) {
  return (
    <h3 className={styles.title}>{props.title}</h3>
  );
}
