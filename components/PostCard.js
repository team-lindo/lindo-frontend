import PropTypes from 'prop-types';
import { Card } from 'antd';
import Link from 'next/link';
import PostImages from './PostImages';

function PostCard({ post }) {
 // if (!post || !post.Images || post.Images.length === 0) return null;
// console.log("포스트 이미지:", post.Images);

  return (
    <div style={{marginBottom: 24 }}>
      <Link href={`/post/${post.id}`} legacyBehavior>
        <a style={{ display: 'block', transition: 'transform 0.3s', borderRadius: '16px' }}>
          <Card
            hoverable
cover={
  <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
    {post.Images?.length > 0 ? (
      <PostImages images={post.Images} />
    ) : (
      <img
        src={post.thumbnail}
        alt="썸네일"
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
    )}
  </div>
}

            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease-in-out',
            }}
            styles={{ body: { display: 'none' } }}       
               />
        </a>
      </Link>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;


/*import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Popover, Button, Space , Avatar, List } from 'antd';
import {BookOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,} from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  likePost,
  removePost,
  unlikePost,
  bookmark,
  updatePost,
} from '../reducers/post';
import FollowButton from './FollowButton';
import { removePostOfMe } from '../reducers/user';
const { Meta } = Card;
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

  const onBookMark = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    console.log("북마크 요청됨: post.id =", post.id);

    return dispatch(bookmark(post.id));
  }, [id, dispatch, post.id]);

  const liked = !!post.Likers?.find((v) => v.id === id);
  //console.log(Card);
  //console.log("💬 post.Comments 데이터 확인:", post.Comments);
  const CustomComment = ({ author, avatar, content }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Avatar src={avatar} alt={author} />
      <div style={{ marginLeft: "10px" }}>
        <strong>{author}</strong>
        <p>{content}</p>
      </div>
    </div>
  );
    //   console.log("🟢 PostCard의 post 객체:", post);
    // console.log("🔵 PostCard의 post.id:", post?.id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={
          post.Images?.length > 0 && (
            <Link href={`/post/${post.id}`} legacyBehavior>
              <a>
                <PostImages images={post.Images} />
              </a>
            </Link>
          )
        }    
    actions={[
          <BookOutlined key="bookmark" onClick={onBookMark} />,
          liked
            ? <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Space>
                {id && post.User.id === id
                  ? (
                    <>
                      {!post.BookMarkId && <Button onClick={onClickUpdate}>수정</Button>}
                      <Button type="danger" loading={removePostLoading} onClick={() => onRemovePost(post.id)}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Space>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.BookMarkId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.BookMarkId && post.BookMark
          ? (
            <Card
              cover={post.BookMark.Images?.length > 0 && <PostImages images={post.BookMark.Images} />}
            >
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.BookMark.User.id}`} legacyBehavior>
                    <Avatar>{post.BookMark.User.nickname[0]}</Avatar>
                  </Link>
                )}
                title={post.BookMark.User.nickname}
                description={<PostCardContent  postId={post.id}  postData={post.BookMark.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
              />
            </Card>
          )
          : (
            <>
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Meta
                avatar={(
                  <Link href={`/user/${post.User.id}`} prefetch={false}>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </Link>
                )}
                title={post.User.nickname}
                description={<PostCardContent  postId={post.id} postData={postData} editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
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
          dataSource={post.Comments}
          renderItem={(item) => (
            <li key={item?.id || Math.random()} style={{ listStyle: "none" }}>
              <CustomComment
                author={item?.User?.nickname || "익명"}
                avatar={item?.User?.nickname ? `https://joeschmoe.io/api/v1/${item?.User?.nickname}` : undefined}
                content={item?.content || "내용 없음"}
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
    BookMarkId: PropTypes.number,
    BookMark: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
*/