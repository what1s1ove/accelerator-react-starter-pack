import { Link } from 'react-router-dom';

export function Logo(props: {
  className?: string
}) {
  return (
    <Link className={props.className} to='/'>
      <img className="logo__img" width="70" height="70" src="/img/logo.svg" alt="Логотип" />
    </Link>
  );
}
