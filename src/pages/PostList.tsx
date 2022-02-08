import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../configs';
import { IPost, IPostWithTestCount } from '../interfaces';
import { getAllPosts } from '../services/PostService';
import api from '../utils/api';
import '../styles/PostList.css';
import { useFetch } from '../hooks/useFetch';
import { CircularProgress } from '@mui/material';

export const PostList = () => {
  const {
    result: posts,
    error,
    isLoading,
  } = useFetch<IPostWithTestCount[]>(BASE_URL + 'posts/result', 'GET');

  if (isLoading) return <CircularProgress className="spinner" />;

  return (
    <div className="posts-list">
      {Array.isArray(posts) &&
        posts.map((post, i) => (
          <div key={post.id} className="posts-list__post">
            <div>
              {i}. <Link to={`${post.id}`}>{post.title}</Link>
            </div>
            <div>
              {post.maxResult}/{post._count.tests}
            </div>
          </div>
        ))}
    </div>
  );
};
