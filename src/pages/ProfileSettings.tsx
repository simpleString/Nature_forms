import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IUserData, IUserSignDTO, IUserStatus } from '../interfaces';
import CloseIcon from '@mui/icons-material/Close';

import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { BASE_URL } from '../configs';
import api from '../utils/api';
import { useRecoilState } from 'recoil';
import { userAtom } from '../state';

interface stateType {
  from: { pathname: string };
}
const ProfileSettings = () => {
  const [username, setUsername] = useRecoilState(userAtom);
  const getUsername = async () => {
    const result = await api.get('auth');
    if (result.status === 200) {
      setUsername(result.data.username);
      console.log(result.data);
    }
  };

  const { result: statuses, isLoading } = useFetch<IUserStatus[]>(
    BASE_URL + 'auth/' + 'statuses',
    'GET'
  );

  const { result: userData, isLoading: userLoading } = useFetch<any>(
    BASE_URL + 'auth/user',
    'GET'
  );

  const { updateUser } = useAuth();
  const [user, setUser] = useState<IUserSignDTO>({
    username: '',
    password: '',
    email: '',
    surname: '',
    status: '',
  });
  const navigate = useNavigate();

  const loginUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateUser(user);
    await getUsername();
    // setUser({ username: '', password: '', email: '', surname: '', status: '' });
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (userData) setUser({ status: userData.statusId, ...userData });
  }, [userData]);

  return (
    <div className="container flex login">
      <form className="login__form">
        <div className="login__header">
          <span>Настройки аккаунта</span>
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
              value={user?.surname}
              size="small"
              onChange={(e) => {
                setUser({ ...user, surname: e.target.value });
              }}
            />
          </div>
          <div className="login__inputs-item">
            <span>Email:</span>
            <TextField
              type="text"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              size="small"
            />
          </div>
          <div className="login__inputs-item">
            <span>Пароль:</span>
            <TextField
              type="text"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              size="small"
            />
          </div>
          <div className="login__inputs-item">
            <span>Статус занятости:</span>
            <Select
              fullWidth
              size="small"
              value={user.status}
              onChange={(e) => {
                setUser({ ...user, status: e.target.value });
              }}
            >
              {statuses?.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="login__inputs-button">
            <Button variant="contained" onClick={loginUser} size="small">
              Сохранить изменения
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
