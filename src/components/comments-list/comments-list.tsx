import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MIN_COMMENT_LENGTH } from '../../const';
import { getCommentsByGuitarId } from '../../store/selectors';
import CommentItem from '../comment-item/comment-item';

function CommentsList(): JSX.Element {
  const comments = useSelector(getCommentsByGuitarId);
  const [areAllCommentsDisplay, setAllCommentsDisplay] = useState(false);
  const [scroll, setScroll] = useState(0);

  const handleShowMoreClick = () => {
    setAllCommentsDisplay(true);
    document.documentElement.scrollTo();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (scroll > document.documentElement.scrollHeight - document.documentElement.clientHeight - 275) {
      setAllCommentsDisplay(true);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [areAllCommentsDisplay, scroll]);

  if (!comments.length) {
    return (
      <p>Напишите первый отзыв к этому товару</p>
    );
  }

  return (
    <>
      {areAllCommentsDisplay ?
        <>
          {comments.map((comment) => <CommentItem review={comment} key={comment.id} />)}
        </> :
        <>
          {comments.slice(0, MIN_COMMENT_LENGTH).map((comment) => <CommentItem review={comment} key={comment.id} />)}
          {comments.length > MIN_COMMENT_LENGTH &&
            <button className="button button--medium reviews__more-button" onClick={handleShowMoreClick}>Показать еще отзывы</button>}
        </>}
      {comments.length !== 0 &&
        <a className="button button--up button--red-border button--big reviews__up-button" href="#top">Наверх</a>}
    </>
  );
}

export default CommentsList;
