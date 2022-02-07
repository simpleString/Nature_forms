import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom, userAtom } from '../state';
import api from '../utils/api';

// export enum Method {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   DELETE = 'DELETE',
// }

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const useFetch = <T>(url: string, method: Method, data = undefined) => {
  const [result, setResult] = useState<T>();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number>();

  const [auth, setAuth] = useRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await api.request({ method, url, data });
      console.log(result);

      if (result.status === 401 || result.status === 403) {
        setAuth(false);
        setUser(undefined);
        setResult(undefined);
      } else {
        setResult(result.data);
      }
      setStatus(result.status);
      setIsLoading(false);
    })();
  }, []);

  return { result, error, isLoading, status };
};
