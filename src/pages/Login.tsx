import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IUserData } from '../interfaces';

import styles from '../styles/login.module.css';

interface stateType {
  from: { pathname: string };
}
export const Login = () => {
  const { login } = useAuth();
  const [user, setUser] = useState<IUserData>({ username: '', password: '' });
  const navigate = useNavigate();

  const loginUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(user);
    setUser({ username: '', password: '' });
    navigate('/', { replace: true });
  };

  return (
    <form className={styles.form}>
      <h1>Login</h1>
      <input
        type="text"
        value={user?.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="text"
        value={user?.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button onClick={loginUser}>Login</button>
    </form>
  );
};
