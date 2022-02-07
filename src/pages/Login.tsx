import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IUserData } from '../interfaces';

import '../styles/Login.css';

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
    <form className="login-component">
      <h1>Login</h1>
      <div className="login-component__input">
        <TextField
          type="text"
          value={user?.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          size="small"
        />
      </div>
      <div className="login-component__input">
        <TextField
          type="text"
          value={user?.password}
          placeholder="password"
          size="small"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </div>

      <Button
        variant="contained"
        onClick={loginUser}
        className="login-component__button"
      >
        Login
      </Button>
    </form>
  );
};
