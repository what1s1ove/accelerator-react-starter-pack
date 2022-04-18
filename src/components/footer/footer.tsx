import { Logo } from '../logo/logo';
import { SocialLinks } from '../social-links/social-links';
import { FooterInfoList } from '../footer-info-list/footer-info-list';
import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__container']}>
        <div className={styles['logo-links__container']}>
          <Logo />
          <SocialLinks />
        </div>

        <section className={styles['container__about']}>
          <h2 className={styles.title}>О нас</h2>
          <p className={styles.text}>
            Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге.
            <br /> <br />
            Все инструменты проверены, отстроены и доведены до идеала!
          </p>
        </section>

        <section className={styles['container__info']}>
          <h2 className={styles.title}>Информация</h2>
          <FooterInfoList />
        </section>

        <section className={styles['container__contacts']}>
          <h2 className={styles.title}>Контакты</h2>
          <p className={styles.text}>
            г. Санкт-Петербург, <br/>
            м. Невский проспект, <br/>
            ул. Казанская 6. <br/>

            <Icon name={`${sprite}#phone`} color="#ffffff" width="8" height="8" />
            <a href="tel:88125005050"> 8-812-500-50-50</a>
          </p>

          <div className={styles.text}>

            <p className={styles.text}>
              <span>Режим работы:</span>
              <br/>
              <Icon name={`${sprite}#clock`} color="#ffffff" width="10" height="10" />
              <span> с 11:00 до 20:00</span>
              <br />
              <span>без выходных</span>
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
}
