import { useEffect, useState } from 'react';
import api from '../utils/api';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const useFetch = (url: string, method: Method) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const result = await api.request({ method, url });
    })();
  });
};
