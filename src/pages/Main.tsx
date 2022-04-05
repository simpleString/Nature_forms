import { Link } from 'react-router-dom';
import MainPageLogo from '../Images/MainPageLogo.png';

import '../styles/Main.css';

export const Main = () => {
  return (
    <div className="container flex main-page">
      <div className="main-page__text">
        <div className="main-page__title">
          Узнай о разнообразии и особенностях клеток!
        </div>
        <p>
          Онлайн-курс по клеточной биологии. Здесь Вы ознакомитесь с основными
          понятиями и узнаете какие бывают клетки. Пройдите все части и тесты
          курса в удобное для Вас время и сроки.
        </p>
        <div className="main-page__button-div">
          <Link className="main-page__button" to="/posts">
            Начать изучение
          </Link>
        </div>
      </div>
      <div className="main-page__image-div">
        <img className="main-page__image" src={MainPageLogo} />
      </div>
    </div>
  );
};
