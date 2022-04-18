import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';
import styles from './social-links.module.css';

const socialIcons = [
  {name: 'facebook', href: 'facebook.com'},
  {name: 'instagram', href: 'instagram.com'},
  {name: 'twitter', href: 'twitter.com'},
];

export function SocialLinks() {
  return (
    <ul className={styles['socials__list']}>
      {socialIcons.map((item) => (
        <li className={styles['socials__item']} key={item.name}>
          <a href={item.href}>
            <Icon name={`${sprite}#${item.name}`} color="#ffffff" width="24" height="24" />
          </a>
        </li>
      ))}
    </ul>
  );
}

