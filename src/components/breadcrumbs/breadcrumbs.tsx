import cn from 'classnames';
import { Link } from 'react-router-dom';

export function Breadcrumbs(props: {
    className?: string
    items: Array<string>
}) {
  return (
    <ul className={cn('breadcrumbs page-content__breadcrumbs', props.className)}>
      {props.items.map((item) => (
        <li className="breadcrumbs__item" key={item}>
          <Link className="link" to="/">{item}</Link>
        </li>
      ))}
    </ul>
  );
}
