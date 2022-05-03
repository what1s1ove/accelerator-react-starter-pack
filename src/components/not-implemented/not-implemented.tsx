import styles from './not-implemented.module.css';

export function NotImplemented(props: {
  text?: string
}) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{props.text ? props.text : 'Current'} page is not implemented</p>
    </div>);
}
