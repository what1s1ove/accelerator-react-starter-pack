import { ChangeEventHandler } from 'react';
import styles from './input-price.module.css';

export function InputPrice(props: {
    id: string
    name: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <div className={styles['form-input']}>
      <input type="number" placeholder={props.placeholder} id={props.id} name={props.name} onChange={props.onChange} />
    </div>
  );
}
