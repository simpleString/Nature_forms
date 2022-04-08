import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../configs';
import api from '../utils/api';

interface IUserTestResult {
  amount: number;
  result: number;
  category: { name: string | undefined };
}

export const TestResult = () => {
  const [result, setResult] = useState<IUserTestResult>();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(BASE_URL + 'posts/' + id + '/tests/result');
      console.log(result.data);
      setResult(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="rating container">
        <span className="rating__item rating__title">Элементы оценивания</span>
        <span className="rating__item rating__title center-item">Оценка</span>
        <span className="rating__item rating__title center-item">Диапазон</span>
        <span className="rating__item">{result?.category.name}</span>
        <span className="rating__item center-item">{result?.result}</span>
        <span className="rating__item center-item">{result?.amount}</span>
      </div>
      <div className="post__footer-buttons">
        <Link className="post__right-link" to="/posts">
          Перейти к следующей теме
        </Link>
      </div>
    </>
  );
};
