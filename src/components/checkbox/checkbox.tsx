import cn from 'classnames';
import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export function Checkbox(props: {
    className?: string
    id: string
    label: number | string
    onChange: ChangeEventHandler<HTMLInputElement>
    strings?: number
    type?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div className={cn('form-checkbox', props.className)}>
      <input
        className="visually-hidden"
        onChange={props.onChange}
        type="checkbox"
        id={props.id}
        name={props.id}
        data-strings={props.strings}
        data-type={props.type}
        data-testid="checkbox-test"
        disabled={props.disabled}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}
