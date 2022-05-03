import { ReactNode } from 'react';
import { H3 } from '../h3/h3';
import styles from './filter-type.module.css';

export function FilterType(props: {
    children: ReactNode
    title: string
}) {
  return (
    <div className={styles.container}>
      <H3 title={props.title} />
      {props.children}
    </div>
  );
}
