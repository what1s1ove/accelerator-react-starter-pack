import cn from 'classnames';
import { Button as ButtonType } from '../../types/button';

export function Button(props: {
    className?: string
    title: string
    type: ButtonType
    isSmallButton?: boolean
    isMiniButton?: boolean
}) {
  return (
    <button className={cn('button',
      {
        'button--red button--add-to-cart': props.type === 'buy',
        'button--red-border button--in-cart': props.type === 'cart',
        'button--small': props.isSmallButton,
        'button--mini': props.isMiniButton,
      },
      props.className,
    )}
    >
      {props.title}
    </button>
  );
}
