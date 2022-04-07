import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../configs';
import { IPost, IPostWithTestCount } from '../interfaces';
import api from '../utils/api';
import '../styles/PostList.css';
import { useFetch } from '../hooks/useFetch';
import { CircularProgress } from '@mui/material';

export const PostList = () => {
  const {
    result: postCategories,
    error,
    isLoading,
  } = useFetch<any[]>(BASE_URL + 'posts', 'GET');

  if (isLoading) return <CircularProgress className="spinner" />;

  return (
    <div className="posts container">
      <div className="posts__title">Программа курса</div>
      <div className="posts__list">
        {postCategories &&
          postCategories?.map((category) => (
            <div key={category.id}>
              <div className="posts__row-title">{category.name}</div>
              <div className="posts__row">
                {category.posts.map((post: any) => (
                  <div key={post.id} className="posts__item">
                    <img src={`${BASE_URL}uploads/${post.img}`} />
                    <p>
                      <Link to={`${post.id}`}>{post.title}</Link>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};
