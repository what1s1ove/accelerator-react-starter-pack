import cn from 'classnames';
import styles from './h2.module.css';

export function H2(props: {
    className?: string
    title: string
}) {
  return (
    <h2 className={cn(props.className, styles.title)}>{props.title}</h2>
  );
}
