import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Popover, Button, Avatar, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import {RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,} from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  likePost,
  removePost,
  unlikePost,
  retweet,
  updatePost,
} from '../reducers/post';
import FollowButton from './FollowButton';
import { removePostOfMe } from '../reducers/user';

moment.locale('ko');

function PostCard({ post }) {
  if (!post || !post.User) {
    return null;
  }

  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const postData = typeof post.content === 'string'
    ? post.content
    : typeof post.description === 'string'
    ? post.description
    : post.text?.description || '내용 없음';

  const onClickUpdate = useCallback(() => setEditMode(true), []);
  const onCancelUpdate = useCallback(() => setEditMode(false), []);

  const onChangePost = useCallback(
    (editText) => () => {
      dispatch(updatePost({
        PostId: post.id,
        content: editText,
      }));
    },
    [dispatch, post.id]
  );

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(likePost(post.id));
  }, [id, dispatch, post.id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(unlikePost(post.id));
  }, [id, dispatch, post.id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(
    async (postId) => {
      if (!id) {
        return alert('로그인이 필요합니다.');
      }
      try {
        await dispatch(removePost(postId));
        dispatch(removePostOfMe(postId));
      } catch (err) {
        console.error('Failed to remove post:', err);
      }
    },
    [id, dispatch]
  );

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(retweet(post.id));
  }, [id, dispatch, post.id]);

  const liked = !!post.Likers?.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images?.length > 0 && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                      <Button type="danger" loading={removePostLoading} onClick={() => onRemovePost(post.id)}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images?.length > 0 && <PostImages images={post.Retweet.Images} />}
            >
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
              />
            </Card>
          )
          : (
            <>
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.User.id}`} prefetch={false}>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </Link>
                )}
                title={post.User.nickname}
                description={<PostCardContent postData={postData} editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
              />
            </>
          )}
      </Card>

      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments?.length || 0}개의 댓글`}
            itemLayout="horizontal"
            dataSource={Array.isArray(post.Comments) ? post.Comments : []}
            renderItem={(item, index) => (
              <li key={item.id || index}>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <Avatar>{item.User.nickname[0]}</Avatar>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
