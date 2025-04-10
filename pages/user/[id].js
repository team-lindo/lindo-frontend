import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fakeApi,follow, unfollow  } from "../../reducers/user";
import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { Card, Avatar, Spin } from "antd";
import ClosetForm from "../../components/ClosetForm"; 
import Image from 'next/image'; 

//const { Text, Paragraph } = Typography;

const UserPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [postsVisible, setPostsVisible] = useState(true);
  const [closetVisible, setClosetVisible] = useState(false); // ✅ 토글 상태
  const [closetData, setClosetData] = useState(null);        // ✅ 옷장 데이터
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const handleFollow = async () => {
    try {
      await dispatch(follow(user.id)); // ✅ me.Followings 자동 갱신됨!
    } catch (err) {
      console.error("팔로우 실패:", err);
    }
  };
  
  const handleUnfollow = async () => {
    try {
      await dispatch(unfollow(user.id)); // ✅ me.Followings에서 제거됨!
    } catch (err) {
      console.error("언팔로우 실패:", err);
    }
  };
  
  useEffect(() => {
    if (me && user) {
      // me.Followings 배열이 있을 경우 해당 유저가 있는지 확인
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
        const res = await fakeApi.getClosetByUserId(Number(id)); // 👈 서버에서 옷장 가져오기
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
              onClick={() => setPostsVisible((prev) => !prev)}
            >
              게시물<br />{user?.Posts?.length || 0}
            </div>,
            <div key="closet" style={styles.clickableText} onClick={toggleCloset}>
              옷장<br />{closetVisible ? "닫기" : "보기"}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={
              <Link href={`/user/${user.id}`} passHref>
                <Avatar style={styles.avatar} as="a">{user.nickname[0]}</Avatar>
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

        {/* 게시물 갤러리 */}
        {postsVisible && user.Posts?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
            {user.Posts.map((post) => (
              <Link href={`/post/${post.id}`} key={post.id}>
                <div style={{ width: "200px", height: "200px",  position: "relative",overflow: "hidden", borderRadius: "8px", display: "block" }}>
                <Image
                  src={post.Images?.[0]?.src || "/default-image.png"}
                  alt="post thumbnail"
                  fill // ✅ 부모가 relative일 때 사용 가능
                  style={{ objectFit: "cover" }}
                />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 옷장 보기 토글 렌더링 */}
        {closetVisible && (
          <div style={{ marginTop: "32px" }}>
            <h3 style={{ marginBottom: "12px" }}>{user.nickname}님의 옷장</h3>
            <ClosetForm clothes={closetData || {}} showUploadButton={false} />
          </div>
        )}
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
