import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IPost } from '../interfaces';
import { getPostsById as getPostById } from '../services/PostService';
import styles from '../styles/post.module.css';
import remarkGfm from 'remark-gfm';
import api from '../utils/api';
import { BASE_URL } from '../configs';
import MDEditor from '@uiw/react-md-editor';
import '../styles/Post.css';
import { Method, useFetch } from '../hooks/useFetch';
import { CircularProgress } from '@mui/material';

export const Post = () => {
  const { id } = useParams();

  const { result: post, isLoading } = useFetch<IPost>(
    BASE_URL + 'posts/' + id,
    'GET'
  );

  if (isLoading) {
    return <CircularProgress className="spinner" />;
  }

  return (
    <div className="post">
      <h1>{post && post.title}</h1>
      <MDEditor.Markdown
        source={post ? post.content : ''}
        className="post__markdown"
      />
      <div className="post__button-menu">
        <p>
          <Link to="test">Start testing</Link>
        </p>
        <p>
          <Link to="test/result">Show result</Link>
        </p>
      </div>
    </div>
  );
};
