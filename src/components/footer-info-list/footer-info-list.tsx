const items = [
  {title: 'Где купить?'},
  {title: 'Блог'},
  {title: 'Вопрос - ответ'},
  {title: 'Возврат'},
  {title: 'Сервис-центры'},
];

export function FooterInfoList() {
  return (
    <ul className="footer__nav-list">
      {items.map((item) => (
        <li className="footer__nav-list-item" key={item.title}>
          <a className="link" href="/">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
