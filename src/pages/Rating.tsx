import React from 'react';
import { BASE_URL } from '../configs';
import { useFetch } from '../hooks/useFetch';
import '../styles/Rating.css';

const Rating = () => {
  const { result, isLoading } = useFetch<any>(BASE_URL + `posts/result`, 'GET');

  return (
    <div className="rating container">
      <span className="rating__item rating__title">Элементы оценивания</span>
      <span className="rating__item rating__title center-item">Оценка</span>
      <span className="rating__item rating__title center-item">Диапазон</span>
      {result &&
        Object.keys(result.userResult).map((key) => (
          <React.Fragment key={key}>
            <span className="rating__item">{key}</span>
            <span className="rating__item center-item">
              {result.userResult[key]}
            </span>
            <span className="rating__item center-item">
              {result.score[key]}
            </span>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Rating;
