import styles from './footer-info-list.module.css';

const items = [
  {title: 'Где купить?'},
  {title: 'Блог'},
  {title: 'Вопрос - ответ'},
  {title: 'Возврат'},
  {title: 'Сервис-центры'},
];

export function FooterInfoList() {
  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <li className={styles['list__item']} key={item.title}>
          <a className={styles.link} href="/">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
