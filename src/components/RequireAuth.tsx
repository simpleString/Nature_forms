import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useAuth } from '../hooks/useAuth';
import { userAtom } from '../state';

interface IRequireAuthProps {
  children: JSX.Element;
  isAdmin?: boolean;
}

export const RequireAuth = ({
  children,
  isAdmin = false,
}: IRequireAuthProps) => {
  const { auth } = useAuth();
  const user = useRecoilValue(userAtom);

  const location = useLocation();

  if (auth !== true)
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;

  if (isAdmin && user !== 'admin') return <Navigate to="/" />;

  return children;
};
