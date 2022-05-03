import { ChangeEventHandler } from 'react';

export function InputPrice(props: {
    id: string
    name: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLInputElement>
    label: string
}) {
  return (
    <div className="form-input">
      <label className="visually-hidden">{props.label}</label>
      <input
        type="number"
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        data-testid="price-input"
      />
    </div>
  );
}
