import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IPost } from '../interfaces';
import { getPostsById as getPostById } from '../services/PostService';
import styles from '../styles/post.module.css';

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) setPost(await getPostById(+id));
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {post ? (
        <div className={styles.post}>
          <div>{post.title}</div>
          {post.content}
          <p>
            <Link to="test">Start testing</Link>
          </p>
          <p>
            <Link to="/posts">Back</Link>
          </p>
        </div>
      ) : (
        <div>Not post</div>
      )}
    </div>
  );
};
