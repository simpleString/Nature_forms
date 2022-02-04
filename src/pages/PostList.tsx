import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../configs';
import { IPost } from '../interfaces';
import { getAllPosts } from '../services/PostService';
import styles from '../styles/postlist.module.css';
import api from '../utils/api';

export const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(BASE_URL + 'posts');
      setPosts(result.data);
      console.log(result.data);

      // setPosts();
    };
    fetchData();
  }, []);

  return (
    <div className={styles.list}>
      {Array.isArray(posts) &&
        posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className={styles.title}>{post.title}</div>
            {post.content}
            <p>
              <Link to={`${post.id}`}>Go to post</Link>
            </p>
          </div>
        ))}
    </div>
  );
};
