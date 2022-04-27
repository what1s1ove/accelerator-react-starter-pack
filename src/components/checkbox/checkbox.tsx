import cn from 'classnames';
import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './checkbox.module.css';

export function Checkbox(props: {
    className?: string
    id: string
    label: number | string
    onChange: ChangeEventHandler<HTMLInputElement>
    strings?: number
    type?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div className={cn(styles['form-checkbox'], props.className)}>
      <input className={styles['visually-hidden']} onChange={props.onChange} type="checkbox" id={props.id} name={props.id} data-strings={props.strings} data-type={props.type} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}
