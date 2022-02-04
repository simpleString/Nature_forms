import axios from 'axios';
import { BASE_URL } from '../configs';
import { IPost } from '../interfaces';
import api from '../utils/api';

export const getPostsById = async (id: number) => {
  const result = await api.get(BASE_URL + 'posts/' + id);
  if (result.status !== 200) {
    throw 'Error';
  }
  const data = result.data as IPost;
  console.log(data);

  return data;
};

export const getAllPosts = async () => {
  const result = await api.get(BASE_URL + 'posts');
  if (result.status !== 200) {
    throw 'Error';
  }
  const data = result.data.data as IPost[];
  console.log(data);
  return data;
};
