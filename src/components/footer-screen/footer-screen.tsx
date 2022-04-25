import React from 'react';
import SocialLink from '../social-link/social-link';
import FooterNav from '../footer-nav/footer-nav';
import FooterContacts from '../footer-contacts/footer-contacts';
import Logo from '../logo/logo';

function FooterScreen():JSX.Element {
  return (
    <div className="footer__container container">
      <Logo />
      <SocialLink />
      <section className="footer__nav-section footer__nav-section--info">
        <h2 className="footer__nav-title">О нас</h2>
        <p className="footer__nav-content footer__nav-content--font-secondary">
          Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!
        </p>
      </section>
      <FooterNav />
      <FooterContacts />
    </div>
  );
}

export default FooterScreen;
