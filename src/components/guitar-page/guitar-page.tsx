import Header from '../header/header';
import Footer from '../footer/footer';
import {useParams, Link} from 'react-router-dom';
import {getCurrentGuitar} from '../../store/guitars-data/selectors';
import {getCurrentGuitarComments} from '../../store/guitars-other-data/selectors';
import {getGuitarsRating} from '../../store/guitars-data/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {fetchCurrentGuitarAction, fetchCurrentGuitarCommentsAction} from '../../store/api-actions';
import GuitarPageReviews from '../guitar-page-reviews/guitar-page-reviews';

type GuitarPageParams = {
  guitarId: string;
};

function GuitarPage(): JSX.Element {
  const currentGuitar = useSelector(getCurrentGuitar);
  const currentGuitarComments = useSelector(getCurrentGuitarComments);
  const allGuitarsRating = useSelector(getGuitarsRating);

  const {guitarId} = useParams<GuitarPageParams>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentGuitarAction(guitarId));
    dispatch(fetchCurrentGuitarCommentsAction(guitarId));
  }, [guitarId, dispatch]);

  let currentGuitarType;

  if (currentGuitar.type === 'electric') {
    currentGuitarType = 'Электрогитара';
  } else if (currentGuitar.type === 'ukulele') {
    currentGuitarType = 'Укулеле';
  } else if (currentGuitar.type === 'acoustic') {
    currentGuitarType = 'Акустическая';
  }

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/" aria-disabled>Товар</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`/${currentGuitar.previewImg}`} width="90" height="235" alt={currentGuitar.name}/>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                {[1, 2, 3, 4, 5].map((idx) => {
                  if (idx > allGuitarsRating[Number(guitarId) - 1] || allGuitarsRating[Number(guitarId) - 1] === 0) {
                    return (
                      <svg width="12" height="11" aria-hidden="true" key={idx}>
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    );
                  } else {
                    return (
                      <svg width="12" height="11" aria-hidden="true" key={idx}>
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                    );
                  }
                })}
                <span className="rate__count"></span>
                <span className="rate__message"></span>
              </div>
              <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{currentGuitar.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{currentGuitarType}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{currentGuitar.stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tabs__product-description hidden">{currentGuitar.description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p><a className="button button--red button--big product-container__button" href="/" onClick={(evt) => evt.preventDefault()}>Добавить в корзину</a>
            </div>
          </div>

          <GuitarPageReviews currentGuitarComments={currentGuitarComments}/>

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default GuitarPage;
