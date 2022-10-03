import { InputHTMLAttributes, DetailedHTMLProps, useState, ChangeEvent } from 'react';
import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getGuitarsByName } from '../../store/guitars/selectors';
import { fetchGuitarsListByName } from '../../store/guitars/api-actions';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../constants/app-route';

export function InputSearch(props: {
    className?: string
    attributes?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}) {
  const [isSearchListOpened, setIsSearchListOpened] = useState<boolean>(false);
  const [searchGuitarName, setSearchGuitarName] = useState<string>('');
  const guitarsByName = useSelector(getGuitarsByName);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setIsSearchListOpened(false);
      return;
    }

    setSearchGuitarName(event.target.value);
    dispatch(fetchGuitarsListByName(searchGuitarName));
    setIsSearchListOpened(true);
  };

  const handleGuitarClick = (id: string) => {
    setSearchGuitarName('');
    setIsSearchListOpened(false);
    history.push(AppRoute.getGuitar(id));
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
          value={searchGuitarName}
          onChange={handleInputChange}
          placeholder="что вы ищите?"
          data-testid="search-guitars"

          {...props.attributes}
        />
        <label className='visually-hidden' htmlFor='search'>Поиск</label>
      </form>

      {isSearchListOpened &&
        <ul className="form-search__select-list" style={{ background: '#131212', zIndex: 5 }}>
          {guitarsByName.map((guitar) => (
            <li key={guitar.id} className="form-search__select-item" onClick={() => handleGuitarClick(guitar.id)} tabIndex={0}>
              {guitar.name}
            </li>))}
        </ul>}
    </div>
  );
}
