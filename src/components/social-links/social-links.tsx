import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';

const socialIcons = [
  {name: 'facebook', href: 'facebook.com'},
  {name: 'instagram', href: 'instagram.com'},
  {name: 'twitter', href: 'twitter.com'},
];

export function SocialLinks() {
  return (
    <ul className="socials__list">
      {socialIcons.map((item) => (
        <li className="socials-item" key={item.name} data-testid={item.name}>
          <a className="socials__link" href={item.href}>
            <Icon name={`${sprite}#${item.name}`} color="#ffffff" width="24" height="24" />
          </a>
        </li>
      ))}
    </ul>
  );
}

