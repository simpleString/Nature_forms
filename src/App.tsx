import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Navigation } from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { PostList } from './pages/PostList';
import { Post } from './pages/Post';
import { NoMatch } from './pages/NoMatch';
import { TestList } from './pages/TestList';
import { usePosts } from './hooks/usePosts';
import { useRecoilState } from 'recoil';
import { authAtom, userAtom } from './state';
import api from './utils/api';
import { BASE_URL } from './configs';
import { RequireAuth } from './components/RequireAuth';
import { Spinner } from './components/UI/Spinner';

function App() {
  const [getPosts, getPostById] = usePosts();

  const [auth, setAuth] = useRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const getUsername = async () => {
    const result = await api.get(BASE_URL + 'auth');
    if ((result.status = 200)) {
      setAuth(true);
      setUser(result.data.username);
      console.log(result.data);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      {loading ? (
        <Spinner />
      ) : (
        <div className="main">
          <Routes>
            <Route
              path="posts"
              element={
                <RequireAuth>
                  <PostList />
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
              path="posts/:id/test"
              element={
                <RequireAuth>
                  <TestList />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
