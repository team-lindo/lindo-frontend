import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Button, List, Space, Popover,message } from 'antd';
import {
  BookOutlined,
  HeartOutlined,
  MessageOutlined,
  HeartTwoTone,
  EllipsisOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import AppLayout from './AppLayout';
import Head from 'next/head';
import FollowButton from './FollowButton';
import {
  likePost,
  removePost,
  unlikePost,
  bookmark,
  unbookmark,
  updatePost,
  loadPost,
  addPostToMainPosts 
} from '../reducers/post';
//import { removePostOfMe } from '../reducers/user';
import Link from "next/link";

moment.locale('ko');

function PostDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const mainPosts = useSelector((state) => state.post.mainPosts);
  const me = useSelector((state) => state.user.me);
  const { removePostLoading } = useSelector((state) => state.post);
  const [editMode, setEditMode] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
const [clientReady, setClientReady] = useState(false);

useEffect(() => {
  setClientReady(true);
}, []);

const post = useMemo(() => {
  if (!id || !me) return null;

  const fromMainPosts = mainPosts?.find((p) => String(p.id) === String(id));
  if (fromMainPosts) return fromMainPosts;

  for (const user of me.Followings || []) {
    const found = user.Posts?.find((p) => String(p.id) === String(id));
    if (found) {
      return {
        ...found,
        User: { id: user.id, nickname: user.nickname },
      };
    }
  }

  return null;
}, [id, mainPosts, me]);

useEffect(() => {
  if (clientReady && router.isReady && !me) {
    router.push('/login');
  }
}, [clientReady, router.isReady, me, router]);

  useEffect(() => {
    if (!post) return;
    const alreadyInMain = mainPosts.find((p) => String(p.id) === String(post.id));
    if (!alreadyInMain) {
      dispatch(addPostToMainPosts(post));
    }
  }, [post, mainPosts, dispatch]);

const transformedPost = useMemo(() => {
  if (!post || !Array.isArray(post.images)) return null;

  return {
    ...post,
    images: post.images.map((src, index) => ({
      id: String(index),
      src,
    })),
    taggedProductsByImage: Object.fromEntries(
      (post.taggedProducts || []).map(tp => [String(tp.imageId), tp.tags])
    ),
  };
}, [post]);
console.log('✅ transformedPost:', transformedPost);
console.log('✅ transformedPost.images:', transformedPost?.images);




  // console.log('BookmarkOutlined:', BookOutlined); // undefined 나오면 import 잘못됨
  // console.log('✅ PostImages:', PostImages);
  // console.log('✅ PostCardContent:', PostCardContent);
  // console.log('✅ AppLayout:', AppLayout);
  // console.log('✅ CommentForm:', CommentForm);
  // console.log('✅ FollowButton:', FollowButton);




  // useEffect(() => {
  //   if (id && !post) {
  //     dispatch(loadPost({ id }));
  //   }
  // }, [dispatch,id, post]);

  //console.log('📌 현재 post:', post);
//   console.log('📌 post.id:', post?.id);
//   console.log('✅ post 내용:', post);
//   console.log('✅ 이미지 리스트:', post?.Images);

  const onClickUpdate = useCallback(() => setEditMode(true), []);
  const onCancelUpdate = useCallback(() => setEditMode(false), []);

  const onChangePost = useCallback(
    (editText) => {
        if (!post) return;
      dispatch(updatePost({ PostId: post.id, content: editText }));
    },
    [dispatch, post]
  );

  // const isLiked = me?.likedPosts?.some((post) => {
  //   // post가 PostId 필드를 가진 경우
  //   return (post.PostId ?? post.id) === postId;
  // });
  // const isLiked = me?.likedPosts?.some((liked) => {
  //   return (liked.PostId ?? liked.id) === post.id;
  // });
  // const isLiked = me?.likedPosts?.some((liked) => liked &&  liked.id === post.id);

const isLiked = useMemo(() => {
  if (!post || !Array.isArray(me?.likedPosts)) return false;
  return me.likedPosts.some((p) => String(p.id) === String(post.id));
}, [me, post]);


  const onUnlike = useCallback(() => {
    if (!me) return alert('로그인이 필요합니다.');
    dispatch(unlikePost(post.id));
  }, [me, dispatch, post?.id]);

  const onLike = useCallback(() => {
    if (!me) return alert('로그인이 필요합니다.');
    if (!post || !post.content) return alert('게시글 정보가 유효하지 않습니다.');
  
    if (isLiked) {
      dispatch(unlikePost(post.id)) // 해제는 id만 넘겨도 OK
        .unwrap()
        .then(() => message.success('좋아요에서 제거되었습니다!'))
        .catch((err) => {
          message.error('좋아요 해제 실패');
          console.error(err);
        });
    } else {
        dispatch(likePost(post.id))
        .unwrap()
        .then(() => message.success('좋아요에 추가되었습니다!'))
        .catch((err) => {
          message.error('좋아요 실패');
          console.error(err);
        });
    }
    console.log("🔥 likePost 요청 postId:", post?.id); 

  }, [me, dispatch, post,isLiked]);


  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(
    async (postId) => {
      if (!me) return alert('로그인이 필요합니다.');
      try {
        await dispatch(removePost(postId)); // ✅ 서버 삭제 + Redux 상태 동시 처리
        console.log('🗑️ 삭제할 postId:', postId);

        //삭제 메세지 추가가
      } catch (err) {
        console.error('Failed to remove post:', err);
      }
    },
    [me, dispatch]
  );
  

  const isBookmarked = useMemo(() => {
    if (!post) return false;
    return (
      me?.bookmarkedPosts?.some((p) => String(p.id) === String(post.id))
    );
  }, [me, post]);

  const onBookMark = useCallback(() => {
    if (!me) return alert('로그인이 필요합니다.');
    if (!post || !post.content) return alert('게시글 정보가 유효하지 않습니다.');
  
    if (isBookmarked) {
      dispatch(unbookmark(post.id)) // 해제는 id만 넘겨도 OK
        .unwrap()
        .then(() => message.success('북마크에서 제거되었습니다!'))
        .catch((err) => {
          message.error('북마크 해제 실패');
          console.error(err);
        });
    } else {
      dispatch(bookmark(post.id)) // ✅ postId 넘겨tj thunk가 생성 가능
        .unwrap()
        .then(() => message.success('북마크에 추가되었습니다!'))
        .catch((err) => {
          message.error('북마크 실패');
          console.error(err);
        });
    }
  }, [me, dispatch, post, isBookmarked]);
  
  // if (!router.isReady) {
  //   return null; // or <LoadingSpinner />
  // }
  
  // if (!post) return <p>게시물을 찾을 수 없습니다.</p>;
 // console.log('likedPosts:', me?.likedPosts);
  console.log('isLiked:', isLiked);
  console.log('me.likedPosts:', me?.likedPosts);
  console.log('post.id:', post?.id);

 if (!clientReady || !router.isReady) {
  return null; // ✅ 조건문은 훅 호출 이후에 위치해야 안전
}
console.log('📌 현재 post:', post);

//console.log("📌 taggedProducts:", post.taggedProducts);
if (!post) return <p>게시물을 찾을 수 없습니다.</p>;
  return (
    <>
      <Head>
        <title>상세 게시물</title>
      </Head>
      <AppLayout>
        <div style={{ margin: '20px auto', maxWidth: '600px' }}>
<Card
  actions={[
    isBookmarked ? (
      <BookOutlined key="bookmark" style={{ color: '#1890ff' }} onClick={onBookMark} />
    ) : (
      <BookOutlined key="bookmark" onClick={onBookMark} />
    ),
    isLiked ? (
      <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnlike} />
    ) : (
      <HeartOutlined key="heart" onClick={onLike} />
    ),
    <MessageOutlined key="comment" onClick={onToggleComment} />,
    <Popover
      key="more"
      content={
        <Space>
          {String(post?.user?.id) === String(me?.id) ? (
            <>
              {!post.BookMarkId && <Button onClick={onClickUpdate}>수정</Button>}
              
              <Button danger loading={removePostLoading} onClick={() => onRemovePost(postId)}>
                삭제
              </Button>
            </>
          ) : (
            <Button>신고</Button>
          )}
        </Space>
      }
    >
      <EllipsisOutlined />
    </Popover>,
  ]}
  title={post.BookMarkId ? `${post.user?.nickname}님이 북마크하셨습니다.` : null}
  extra={<FollowButton userId={post.user.id} />}
>
  
  {/* ✅ 이미지 렌더링은 카드 내부로 이동 */}
 {transformedPost?.images?.length > 0 ? (
    <PostImages
      // images={post.Images}
      // taggedProductsByImage={post.taggedProductsByImage}
       images={transformedPost.images}
  taggedProductsByImage={transformedPost.taggedProductsByImage}
   
  />
  ) : post?.images?.length > 0 ? (
    <img
      src={post.images[0]}
      alt="썸네일"
      style={{
        width: 'auto',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '12px',
        display: 'block',
        marginBottom: '16px',
      }}
    />
  ) : null}

  {/* ✅ 작성자 및 본문 */}
  {post.user && (
    <Card.Meta
      avatar={
        <Link href={`/user/${post.user.id}`}>
          <Avatar style={{ cursor: 'pointer' }}>
            {post.user?.nickname?.[0] || 'U'}
          </Avatar>
        </Link>
      }
      title={
        <Link href={`/user/${post.user.id}`}>
          <span style={{ cursor: 'pointer', color: 'inherit' }}>
            {post.user?.nickname || '알 수 없는 사용자'}
          </span>
        </Link>
      }
      description={
        <>
          <PostCardContent
            postId={post.id}
            postData={post.content}
            editMode={editMode}
            onChangePost={onChangePost}
            onCancelUpdate={onCancelUpdate}
          />
          <p style={{ marginTop: 10, color: '#888' }}>
            {post.createdAt ? moment(post.createdAt).format('YYYY.MM.DD') : ''}
          </p>
        </>
      }
    />
  )}
</Card>

   
          {commentFormOpened && (
  <div style={{ marginTop: '20px' }}>
    {/* 댓글 개수 or "댓글 없음" 메시지 */}
    <div style={{ marginBottom: '12px' }}>
    {post?.comments?.length === 0 ? (
      <p style={{ color: '#999' }}>댓글이 없습니다.</p>
    ) : (
      <p style={{ fontWeight: 'bold' }}>{post?.comments?.length || 0}개의 댓글</p>
    )}

    </div>

    {/* 댓글 입력창 */}
    <CommentForm post={post} />

    {/* 댓글 목록 */}
    {post.comments?.length > 0 && (
      <List
        itemLayout="horizontal"
        dataSource={post.comments}
        renderItem={(item) => (
          <li key={item.commentId}>
            <Space>
              <Avatar>{item.user?.nickname?.[0] || 'U'}</Avatar>
              <strong>{item.user?.nickname || '알 수 없는 사용자'}</strong>
              <p>{item.commentContent}</p>
            </Space>
          </li>
        )}
      />
    )}
  </div>
)}
        </div>
      </AppLayout>
    </>
  );
}

export default PostDetail;
