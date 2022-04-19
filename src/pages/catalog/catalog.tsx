import cn from 'classnames';
import { H2 } from '../../components/h2/h2';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { PriceFilter } from '../../components/price-filter/price-filter';
import { GuitarFilter } from '../../components/guitar-filter/guitar-filter';
import { StringFilter } from '../../components/string-filter/string-filter';
import { SortingFilter } from '../../components/sorting-filter/sorting-filter';
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

        <div className={styles.catalog}>
          <form className={styles['catalog-filter']}>
            <H2 className={styles['catalog__filter']} title="Фильтр" />
            <PriceFilter />
            <GuitarFilter />
            <StringFilter />
          </form>

          <SortingFilter />
        </div>
      </div>
    </main>
  );
}
