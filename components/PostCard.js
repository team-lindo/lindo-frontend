import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Popover, Button, Avatar, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import {
  RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,
} from '@ant-design/icons';
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
  //console.log('Post Data:', post); // Redux에서 전달된 데이터 확인

  const postData = typeof post.description === 'string' 
  ? post.description 
  : typeof post.content === 'string'
  ? post.content 
  : '내용 없음';

  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  //console.log("현재 로그인한 사용자 ID:", id);

  const [editMode, setEditMode] = useState(false);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback((editText) => () => {
    dispatch(updatePost({
      PostId: post.id,
      content: editText,
    }));
  }, [post]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(likePost(post.id));
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(unlikePost(post.id));
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

 /* const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(removePost(post.id));
  }, [id]);
*/
const onRemovePost = useCallback(
  (postId) => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    // 게시물 삭제 액션 호출
    dispatch(removePost(postId))
      .then(() => {
        // 삭제 성공 시 유저 상태 업데이트
        dispatch(removePostOfMe(postId));
      })
      .catch((err) => {
        console.error('Failed to remove post:', err);
      });
  },
  [id, dispatch]
);
const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(retweet(post.id));
  }, [id]);

  const liked = post.Likers?.find((v) => v.id === id) || false;
  return (

    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        //배열 안에 jsx넣을 때 key 필수
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
                //수정,삭제는 내가, 신고는 남이
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                      <Button type="danger" loading={removePostLoading}  onClick={() => onRemovePost(post.id)}>삭제</Button>
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
        //로그인했을 때 버튼 보이게
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
           
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
                description={<PostCardContent  postData={postData} editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate}   />}
              />
            </>
          )}
      </Card>
{/* 댓글*/}
      {commentFormOpened && (
        <div>
            {/*어떤 게시글에 댓글을 달지에 대한 정보가 필요함-> 게시글의 id를 받기 위해 CommentForm이 post를 받아야함*/}
          <CommentForm post={post} />
          <List
             header={`${post.Comments?.length || 0}개의 댓글`}            itemLayout="horizontal"
             dataSource={Array.isArray(post.Comments) ? post.Comments : []} // Comments가 배열이 아닐 경우 빈 배열로 처리
             renderItem={(item) => (
              <li>
                {/*post의 Comments각각이 item이 됨*/}
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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // string과 number 모두 허용
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