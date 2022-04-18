import cn from 'classnames';
import { H2 } from '../../components/h2/h2';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import styles from './catalog.module.css';

const breadcrumbsItems = ['Главная', 'Каталог'];

export function Catalog(props: {
    className?: string
}) {
  return (
    <main className={cn(styles.content, props.className)}>
      <div className={styles['content__container']}>
        <H2 title="Каталог гитар" />
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbsItems} />
      </div>
    </main>
  );
}
