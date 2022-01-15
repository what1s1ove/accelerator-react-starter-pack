import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchGuitarItemAction } from '../../store/api-actions';
import { getGuitarItem } from '../../store/guitar/selectors';
import { formatNumber, translateTypeGuitars } from '../../utils/utils';
import Footer from '../footer/footer';
import Header from '../header/header';
import NotFound from '../not-found/not-found';
import Rating from '../rating/rating';

function Product(): JSX.Element {
  const guitar = useSelector(getGuitarItem);
  const {id} = useParams<{id: string}>();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGuitarItemAction(id));
  }, [dispatch, id]);

  if (!guitar) {
    return <NotFound />;
  }
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Main}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="#">Товар</Link>
            </li>
          </ul>
          <div className="product-container">
            <img
              className="product-container__img"
              src={`/${guitar.previewImg}`}
              width="90" height="235"
              alt={guitar.name}
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                {guitar.name}
              </h2>
              <div className="rate product-container__rating" aria-hidden="true">
                <Rating rating={4} width={14} height={14} />
                <span className="rate__count"></span>
                <span className="rate__message"></span>
              </div>
              <div className="tabs">
                <Link className="button button--medium tabs__button" to="#characteristics">
                  Характеристики
                </Link>
                <Link className="button button--black-border button--medium tabs__button" to="#description">
                  Описание
                </Link>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{guitar.vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{translateTypeGuitars(guitar.type)}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{`${guitar.stringCount} струнная`}</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description hidden">
                    {guitar.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">
                Цена:
              </p>
              <p className="product-container__price-info product-container__price-info--value">
                {formatNumber(guitar.price)} ₽
              </p>
              <Link className="button button--red button--big product-container__button" to="#">Добавить в корзину</Link>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3><Link className="button button--red-border button--big reviews__sumbit-button" to="#">Оставить отзыв</Link>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true">
                <Rating rating={4} width={16} height={16} />
                <span className="rate__count"></span>
                <span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true">
                <Rating rating={4} width={16} height={16} />
                <span className="rate__count"></span>
                <span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true">
                <Rating rating={4} width={16} height={16} />
                <span className="rate__count"></span>
                <span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.
              </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <Link className="button button--up button--red-border button--big reviews__up-button" to="#header">
              Наверх
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Product;
