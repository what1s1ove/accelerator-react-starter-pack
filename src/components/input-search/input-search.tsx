import { InputHTMLAttributes, DetailedHTMLProps, useState, ChangeEvent } from 'react';
import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getGuitarsByName } from '../../store/guitars/selectors';
import { fetchGuitarsListByName } from '../../store/guitars/api-actions';

export function InputSearch(props: {
    className?: string
    attributes?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}) {
  const [isSearchListOpened, setIsSearchListOpened] = useState<boolean>(false);
  const guitarsByName = useSelector(getGuitarsByName);
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setIsSearchListOpened(false);
      return;
    }

    dispatch(fetchGuitarsListByName(event.target.value));
    setIsSearchListOpened(true);
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <Icon className="form-search__icon" name={`${sprite}#search`} color="#ffffff" width="14" height="14" />
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          onChange={handleInputChange}
          placeholder="что вы ищите?"

          {...props.attributes}
        />
        <label className='visually-hidden' htmlFor='search'>Поиск</label>
      </form>

      {isSearchListOpened &&
        <ul className="form-search__select-list" style={{ background: '#131212', zIndex: 5 }}>
          {guitarsByName.map((guitar) => <li key={guitar.id} className="form-search__select-item" tabIndex={0}>{guitar.name}</li>)}
        </ul>}
    </div>
  );
}
