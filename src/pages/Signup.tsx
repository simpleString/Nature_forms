import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IUserData } from '../interfaces';
import CloseIcon from '@mui/icons-material/Close';

import '../styles/Login.css';
import { Link } from 'react-router-dom';

interface stateType {
  from: { pathname: string };
}
const Signup = () => {
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
    <div className="container flex login">
      <form className="login__form">
        <div className="login__header">
          <Link to="/login" className="login__header-item">
            Вход
          </Link>
          <Link to="/signup" className="login__header-item active">
            Регистрация
          </Link>
          <Link to="/">
            <CloseIcon className="login__header-item" />
          </Link>
        </div>
        <div className="login__inputs">
          <div className="login__inputs-item">
            <span>Имя:</span>
            <TextField
              type="text"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              size="small"
            />
          </div>
          <div className="login__inputs-item">
            <span>Фамилия:</span>
            <TextField
              type="text"
              value={user?.password}
              size="small"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <div className="login__inputs-item">
            <span>Email:</span>
            <TextField
              type="text"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              size="small"
            />
          </div>
          <div className="login__inputs-item">
            <span>Пароль:</span>
            <TextField
              type="text"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              size="small"
            />
          </div>
          <div className="login__inputs-item">
            <span>Статус занятости:</span>
            <TextField
              type="text"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              size="small"
            />
          </div>
          <div className="login__inputs-button">
            <Button variant="contained" onClick={loginUser} size="small">
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
