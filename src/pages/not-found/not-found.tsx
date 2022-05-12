import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export function NotFound() {
  return (
    <div className={styles.container}>
      <p>404 Not found</p>
      <Link className={styles.link} to="/">Go to the main page</Link>
    </div>
  );
}
