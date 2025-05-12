import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fakeApi, follow, unfollow } from "../../reducers/user";
import { loadUserPosts } from "../../reducers/post";
import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { Card, Avatar, Spin } from "antd";
import ClosetForm from "../../components/ClosetForm";
import Image from "next/image";

const UserPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post.posts);
  const [user, setUser] = useState(null);
  const [postsVisible, setPostsVisible] = useState(true);
  const [closetVisible, setClosetVisible] = useState(false);
  const [closetData, setClosetData] = useState(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  useEffect(() => {
    if (me && user) {
      const following = me.Followings?.some((f) => f.id === user.id);
      setIsFollowingUser(following);
    }
  }, [me, user]);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const res = await fakeApi.getUserById(Number(id));
        if (res?.data) {
          setUser(res.data);
        } else {
          console.warn("유저 정보를 찾을 수 없습니다.");
          setUser(null);
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, [id]);

  const toggleCloset = async () => {
    if (!closetVisible && !closetData) {
      try {
        const res = await fakeApi.getClosetByUserId(Number(id));
        if (res?.data) {
          setClosetData(res.data);
        } else {
          console.warn("옷장 정보 없음");
        }
      } catch (err) {
        console.error("옷장 로딩 실패:", err);
      }
    }
    setClosetVisible((prev) => !prev);
  };

  const handleTogglePosts = () => {
    const toggled = !postsVisible;
    setPostsVisible(toggled);

    if (toggled && posts.length === 0) {
      dispatch(loadUserPosts(user.id));
    }
  };
  useEffect(() => {
    if (user?.id) {
      dispatch(loadUserPosts({ id: user.id }))
        .unwrap()
        .then((data) => {
          console.log("✅ 게시글 응답:", data); // data = { posts: [...], hasMorePosts: true }
        })
        .catch((err) => {
          console.error("❌ 게시글 불러오기 실패:", err);
        });
    }
  }, [user?.id]);
  
  const handleFollow = async () => {
    try {
      await dispatch(follow(user.id));
    } catch (err) {
      console.error("팔로우 실패:", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await dispatch(unfollow(user.id));
    } catch (err) {
      console.error("언팔로우 실패:", err);
    }
  };

  const styles = useMemo(() => ({
    cardContainer: { marginTop: "16px" },
    avatar: { backgroundColor: "#87d068" },
    clickableText: { cursor: "pointer", color: "blue" },
    postCard: { marginTop: "16px" },
  }), []);

  if (!user) {
    return (
      <AppLayout>
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Spin size="large" tip="로딩 중...">
            <div style={{ height: 100 }} />
          </Spin>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px" }}>
        <Card
          style={styles.cardContainer}
          actions={[
            <div
              key="post"
              style={styles.clickableText}
              onClick={handleTogglePosts}
            >
              게시물<br />{posts.length}
            </div>,
            <div key="closet" style={styles.clickableText} onClick={toggleCloset}>
              옷장<br />{closetVisible ? "닫기" : "보기"}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={
              <Link href={`/user/${user.id}`} passHref>
                <Avatar style={styles.avatar} as="a">
                  {user.nickname[0]}
                </Avatar>
              </Link>
            }
            title={
              <Link href={`/user/${user.id}`}>
                <span style={{ color: "inherit" }}>{user.nickname}</span>
              </Link>
            }
            description={me?.id === user.id ? "방가방가" : "유저 프로필"}
          />
        </Card>

        {/* 게시물 썸네일 리스트 */}
        {postsVisible && posts.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
            {posts.map((post) => (
              <Link href={`/post/${post.id}`} key={post.id}>
                <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                  <Image
                    src={post.thumbnail}
                    alt="썸네일"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 옷장 보기 */}
        {closetVisible && (
          <div style={{ marginTop: "32px" }}>
            <h3 style={{ marginBottom: "12px" }}>{user.nickname}님의 옷장</h3>
            <ClosetForm clothes={closetData || {}} showUploadButton={false} />
          </div>
        )}

        {/* 팔로우 / 언팔로우 */}
        {me?.id !== user.id && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            {isFollowingUser ? (
              <button
                onClick={handleUnfollow}
                style={{
                  padding: "8px 16px",
                  background: "#fff",
                  color: "#000",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                언팔로우
              </button>
            ) : (
              <button
                onClick={handleFollow}
                style={{
                  padding: "8px 16px",
                  background: "#1890ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                팔로우
              </button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default UserPage;
