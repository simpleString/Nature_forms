import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useAuth } from '../hooks/useAuth';
import { userAtom } from '../state';
import '../styles/Navigation.css';

export const Navigation = () => {
  const { auth, logout } = useAuth();

  const username = useRecoilValue(userAtom);

  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <Link to="">Main</Link>
          </li>
          <li>
            <Link to="posts">Posts</Link>
          </li>
          {username === 'admin' && (
            <li>
              <Link to="create-post">CreatePost</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="login">
        {!auth ? (
          <Link to="login">Login</Link>
        ) : (
          <span onClick={logout}>{username}</span>
        )}
      </div>
    </div>
  );
};
