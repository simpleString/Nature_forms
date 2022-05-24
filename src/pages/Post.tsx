import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IPost } from '../interfaces';
import { BASE_URL } from '../configs';
import MDEditor from '@uiw/react-md-editor';
import '../styles/Post.css';
import { useFetch } from '../hooks/useFetch';
import { CircularProgress } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Cell from '../Cell.png';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

import Model from '../components/Mode';
import { OrbitControls, Stage } from '@react-three/drei';

interface IPostDataExtendent {
  post: IPost;
  nextPost: { id: number } | null;
  previousPost: { id: number } | null;
}

const Post = () => {
  const ref = useRef<any>();
  const { id } = useParams();

  const { result, isLoading } = useFetch<IPostDataExtendent>(
    BASE_URL + 'posts/' + id,
    'GET',
    undefined,
    id
  );

  if (isLoading) {
    return <CircularProgress className="spinner" />;
  }

  return (
    <div className="post container">
      <h1 className="post__title">{result && result.post.title}</h1>
      {result?.post.title === 'Особенности строения растительной клетки' && (
        <>
          <Carousel
            height={400}
            autoPlay={false}
            className="corousel"
            swipe={false}
          >
            <div className="post__img-container">
              <img className="post__img" src={Cell} />
            </div>
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
              <ambientLight position={[10, 10, 10]} />
              {/* <pointLight position={} /> */}
              <Suspense fallback={null}>
                {/* <Stage
                  controls={ref}
                  preset="rembrandt"
                  intensity={0}
                  environment="city"
                > */}
                <Model />
                {/* </Stage> */}
              </Suspense>
              <OrbitControls ref={ref} autoRotate />
            </Canvas>
          </Carousel>
        </>
      )}
      <MDEditor.Markdown
        source={result ? result.post.content : ''}
        className="post__markdown"
      />

      <div className="post__footer">
        {Array.isArray(result?.post?.tests) && result!.post.tests.length > 0 && (
          <div className="post__button-div">
            <Link className="post__button" to="test">
              Пройдите тест для закрепления знаний по разделу
            </Link>
          </div>
        )}
        <div className="post__footer-buttons">
          {result?.previousPost && (
            <>
              <Link
                className="post__left-link"
                to={`../posts/${result.previousPost.id}`}
              >
                Вернуться к предыдущей теме
              </Link>
            </>
          )}

          {result?.nextPost && (
            <Link
              className="post__right-link"
              to={`/posts/${result.nextPost.id}`}
            >
              Перейти к следующей теме
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
