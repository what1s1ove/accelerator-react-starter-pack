import cn from 'classnames';
import { ReactNode, ForwardedRef, forwardRef } from 'react';

export const Modal = forwardRef((props: {
  className?: string
  children: ReactNode
  isModalShown: boolean
}, ref: ForwardedRef<HTMLDivElement>) => (
  <div>
    <div className={cn('modal', props.isModalShown ? 'is-active' : '', props.className)}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal />
        <div className="modal__content" ref={ref}>
          {props.children}
        </div>
      </div>
    </div>
  </div>
));

Modal.displayName = 'Modal';
