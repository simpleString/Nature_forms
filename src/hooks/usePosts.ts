import React from 'react';
import { useRecoilState } from 'recoil';
import { postsAtom } from '../state';
import api from '../utils/api';

export const usePosts = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);

  const getPosts = async () => {
    const result = await api.get('posts');
    const newPosts = result.data.data;
    setPosts(newPosts);
  };

  const getPostsById = async (id: number) => {
    const post = posts?.find((post) => post.id === id);
    return post;
  };

  return [getPosts, getPostsById];
};
