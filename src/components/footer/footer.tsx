import { Logo } from '../logo/logo';
import { SocialLinks } from '../social-links/social-links';
import { FooterInfoList } from '../footer-info-list/footer-info-list';
import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo className="footer__logo logo"/>
        <div className="socials footer__socials">
          <SocialLinks />
        </div>

        <section className="footer__nav-section footer__nav-section--info">
          <h2 className="footer__nav-title">О нас</h2>
          <p className="footer__nav-content footer__nav-content--font-secondary">
            Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге. <br/><br/>
            Все инструменты проверены, отстроены и доведены до идеала!
          </p>
        </section>

        <section className="footer__nav-section footer__nav-section--links">
          <h2 className="footer__nav-title">Информация</h2>
          <FooterInfoList />
        </section>

        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">Контакты</h2>
          <p className="footer__nav-content">
            г. Санкт-Петербург, <br/>
            м. Невский проспект, <br/>
            ул. Казанская 6. <br/>
          </p>

          <div className="footer__nav-content">
            <Icon className="footer__icon" name={`${sprite}#phone`} color="#ffffff" width="8" height="8" />
            <a className="link" href="tel:88125005050"> 8-812-500-50-50</a>
          </div>

          <p className="footer__nav-content">
            <span>Режим работы:</span>
            <br />
            <span className="footer__span">
              <Icon className="footer__icon" name={`${sprite}#clock`} color="#ffffff" width="10" height="10" />
              <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                <use xlinkHref="#icon-clock"></use>
              </svg>
              <span>с 11:00 до 20:00</span> <span>без выходных</span>
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}
