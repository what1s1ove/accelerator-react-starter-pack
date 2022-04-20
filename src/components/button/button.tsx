import cn from 'classnames';
import { Button as ButtonType } from '../../types/button';
import styles from './button.module.css';

export function Button(props: {
    className?: string
    title: string
    type: ButtonType
    isSmallButton?: boolean
}) {
  return (
    <button className={cn(
      styles['button'],
      {
        [styles['button--red']]: props.type === 'buy',
        [styles['button--add-to-cart']]: props.type === 'buy',
        [styles['button--red-border']]: props.type === 'cart',
        [styles['button--in-cart']]: props.type === 'cart',
        [styles['button--small']]: props.isSmallButton,
      },
      props.className,
    )}
    >
      {props.title}
    </button>
  );
}
