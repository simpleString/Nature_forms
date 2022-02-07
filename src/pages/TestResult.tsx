import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../configs';
import api from '../utils/api';

interface IUserTestResult {
  amount: number;
  result: number;
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
    <div>
      Amount: {result?.amount}
      UserResult: {result?.result}
    </div>
  );
};
