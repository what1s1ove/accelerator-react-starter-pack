import { InputHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';
import styles from './input-search.module.css';

export function InputSearch(props: {
    className?: string
    attributes?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}) {
  return (
    <div className={cn(styles.container, props.className)}>
      <Icon className={styles['search-icon']} name={`${sprite}#search`} color="#ffffff" width="14" height="14" />
      <input
        className={styles.input}
        placeholder="что вы ищите?"
        {...props.attributes}
      />
    </div>
  );
}
