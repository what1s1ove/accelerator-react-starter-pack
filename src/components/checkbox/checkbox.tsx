import cn from 'classnames';
import styles from './checkbox.module.css';

export function Checkbox(props: {
    className?: string
    id: string
    name: string
}) {
  return (
    <div className={cn(styles['form-checkbox'], props.className)}>
      <input className={styles['visually-hidden']} type="checkbox" id={props.id} name={props.id} />
      <label htmlFor={props.id}>{props.name}</label>
    </div>
  );
}

// form-checkbox catalog-filter__block-item;
