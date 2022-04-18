import styles from './input-price.module.css';

export function InputPrice(props: {
    id: string
    name: string
    placeholder: string
}) {
  return (
    <div className={styles['form-input']}>
      <input type="number" placeholder={props.placeholder} id={props.id} name={props.name} />
    </div>
  );
}
