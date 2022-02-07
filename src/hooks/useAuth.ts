import React from 'react';
import { useRecoilState } from 'recoil';
import { IUserData } from '../interfaces';
import { authAtom, userAtom } from '../state';
import api from '../utils/api';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const getUsername = async () => {
    const result = await api.get('auth');
    if (result.status === 200) {
      setAuth(true);
      setUser(result.data.username);
      console.log(result.data);
    }
  };

  const login = async (newUser: IUserData) => {
    const result = await api.post('auth/login', newUser);
    if (result.status === 202) {
      await getUsername();
    }
    console.log(result);
  };
  const logout = async () => {
    const result = await api.get('auth/logout');
    if (result.status === 200) {
      setAuth(false);
      setUser(undefined);
    }
    console.log(result);
  };

  return { auth, login, logout };
};
