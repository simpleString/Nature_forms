import React from 'react';
import { useRecoilState } from 'recoil';
import { IUserData } from '../interfaces';
import { authAtom } from '../state';
import api from '../utils/api';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  const login = async (newUser: IUserData) => {
    const result = await api.post('auth/login', newUser);
    if (result.status === 202) {
      setAuth(true);
    }
    console.log(result);
  };
  const logout = async () => {
    const result = await api.get('auth/logout');
    if (result.status === 200) {
      setAuth(false);
    }
    console.log(result);
  };

  return { auth, login, logout };
};
