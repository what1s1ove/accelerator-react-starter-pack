import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export function InputPrice(props: {
    id: string
    name: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLInputElement>
    label: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)  {
  return (
    <div className="form-input">
      <label className="visually-hidden">{props.label}</label>
      <input
        type="number"
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        data-testid="price-input"
        min={props.min}
        max={props.max}
        value={props.value}
      />
    </div>
  );
}
