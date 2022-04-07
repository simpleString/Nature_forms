import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IPost } from '../interfaces';
import { BASE_URL } from '../configs';
import MDEditor from '@uiw/react-md-editor';
import '../styles/Post.css';
import { useFetch } from '../hooks/useFetch';
import { CircularProgress } from '@mui/material';
import ArrowLeft from '../Images/Arrow_left.png';

interface IPostDataExtendent {
  post: IPost;
  nextPost: { id: number } | null;
  previousPost: { id: number } | null;
}

const Post = () => {
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
              <div>
                <Link
                  className="post__left-link"
                  to={`../posts/${result.previousPost.id}`}
                >
                  Вернуться к предыдущей теме
                </Link>
              </div>
              <img src={ArrowLeft} />
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
