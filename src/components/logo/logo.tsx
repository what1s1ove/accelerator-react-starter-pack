import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to='/'>
      <img className="logo__img" width="70" height="70" src="/img/logo.svg" alt="Логотип" />
    </Link>
  );
}
