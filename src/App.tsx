import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Navigation } from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { PostList } from './pages/PostList';
import { NoMatch } from './pages/NoMatch';
import { TestList } from './pages/TestList';
import { useRecoilState } from 'recoil';
import { authAtom, userAtom } from './state';
import api from './utils/api';
import { BASE_URL } from './configs';
import { RequireAuth } from './components/RequireAuth';
import { Main } from './pages/Main';
import { CreatePost } from './pages/CreatePost';
import { TestResult } from './pages/TestResult';
import { useFetch } from './hooks/useFetch';
import { CircularProgress } from '@mui/material';
import Signup from './pages/Signup';
import ProfileSettings from './pages/ProfileSettings';
import Rating from './pages/Rating';
import Post from './pages/Post';

function App() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const getUsername = async () => {
    const result = await api.get('auth');
    if (result.status === 200) {
      setAuth(true);
      setUser(result.data.username);
      console.log(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsername();
  }, []);

  if (loading) return <CircularProgress className="spinner" />;

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="posts"
          element={
            <RequireAuth>
              <PostList />
            </RequireAuth>
          }
        />
        <Route
          path="rating"
          element={
            <RequireAuth>
              <Rating />
            </RequireAuth>
          }
        />
        <Route
          path="posts/:id"
          element={
            <RequireAuth>
              <Post />
            </RequireAuth>
          }
        />
        <Route
          path="posts/:id/test/result"
          element={
            <RequireAuth>
              <TestResult />
            </RequireAuth>
          }
        />
        <Route
          path="posts/:id/test"
          element={
            <RequireAuth>
              <TestList />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route
          path="createPost"
          element={
            <RequireAuth isAdmin={true}>
              <CreatePost />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
