import cn from 'classnames';
import { Link } from 'react-router-dom';

type BreadcrumbsItems = {
  title: string,
  link: string
}

export function Breadcrumbs(props: {
    className?: string
    items: Array<BreadcrumbsItems>
}) {
  return (
    <ul className={cn('breadcrumbs page-content__breadcrumbs', props.className)}>
      {props.items.map((item) => (
        <li className="breadcrumbs__item" key={item.title}>
          <Link className="link" to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
