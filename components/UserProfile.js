import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, Avatar, Button, Modal } from "antd";
import FollowList from "./FollowList";
import  LoginForm from "../components/LoginForm";
import { fakeApi,logOut,setLogOutLoading,fetchUserProfile,loadMyInfo,loadFollowers,loadFollowings} from "../reducers/user";
import Link from "next/link";
import Image from "next/image";
import { UploadOutlined } from "@ant-design/icons";
import Router from "next/router";
import { loadUserPosts } from "../reducers/post";

const UserProfile = ({ userId: propUserId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me, profileUser  } = useSelector((state) => state.user);
  const [userId, setUserId] = useState(null);
  //const posts = useSelector((state) => state.post.posts);
  const user = me.id === userId ? me : profileUser;

  const posts = user?.Posts || [];
  const [viewedUser, setViewedUser] = useState(null);
  const [postsVisible, setPostsVisible] = useState(true);
  const [followerModalVisible, setFollowerModalVisible] = useState(false);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);
  const logOutLoading = useSelector((state) => state.user.logOutLoading);
  useEffect(() => {
    if (!me) {
      dispatch(loadMyInfo());
    }
  }, [me, dispatch]);
  
  // userId 설정 (router or props)

  useEffect(() => {
    if (!userId && me && !propUserId && !router.query.id) {
      setUserId(me.id);
    } else if (!userId && propUserId) {
      setUserId(propUserId);
    } else if (!userId && router.isReady && router.query.id) {
      const id = parseInt(router.query.id, 10);
      if (!isNaN(id)) {
        setUserId(id);
      }
    }
  }, [userId, me, propUserId, router.isReady, router.query.id]);
  
  
//fetchUserProfile
useEffect(() => {
  if (userId && router.isReady) {
    console.log("✅ fetchUserProfile 실행:", userId);
    dispatch(fetchUserProfile(userId));
  }
}, [userId, router.isReady]);

useEffect(() => {
  console.log("🧪 현재 userId:", userId);
}, [userId]);

  
  const handleTogglePosts = () => {
    const toggled = !postsVisible;
    setPostsVisible(toggled);
  
    if (toggled && posts.length === 0) {
      dispatch(loadUserPosts({ id: user.id }));
    }
  };
  
  const onLogOut = useCallback(async () => {
    dispatch(setLogOutLoading(true)); // ✅ 로그아웃 로딩 시작
    await dispatch(logOut()); // ✅ Redux에서 로그아웃 요청
    router.push("/"); // ✅ 로그아웃 후 홈 화면으로 이동
  }, [dispatch, router]);
  
  const styles = useMemo(
    () => ({
      cardContainer: { marginTop: "16px" },
      button: { marginTop: "16px" },
      avatar: { backgroundColor: "#87d068" },
      clickableText: { cursor: "pointer", color: "blue" },
    }),
    []
  );

  useEffect(() => {
    if (followerModalVisible) {
      dispatch(loadFollowers());
    }
  }, [followerModalVisible, dispatch]);

  useEffect(() => {
    if (followingModalVisible) {
      dispatch(loadFollowings());
    }
  }, [followingModalVisible, dispatch]);

  const isMyProfile = useMemo(() => {
    if (!me || !userId) return false;
    return me.id === userId;
  }, [me, userId]);
    
  if (!me) return <LoginForm />;
  if (!user) return null;
  console.log("🔥 현재 게시글 목록:", posts);


  return (
    <>
      <Card
        style={styles.cardContainer}
        actions={
          isMyProfile
            ? [
              <div
              key="post"
              style={styles.clickableText}
              onClick={handleTogglePosts}
            >
              게시물<br />{posts.length}
                </div>,
                <div
                  key="follower"
                  style={styles.clickableText}
                  onClick={() => setFollowerModalVisible(true)}
                >
                  팔로워<br />
                  {user?.Followers?.length || 0}
                </div>,
                <div
                  key="following"
                  style={styles.clickableText}
                  onClick={() => setFollowingModalVisible(true)}
                >
                  팔로잉<br />
                  {user?.Followings?.length || 0}
                </div>,
              ]
            : [
              <div
                key="post"
                style={styles.clickableText}
                onClick={handleTogglePosts}
              >
                게시물<br />{posts.length}
              </div>,
                <div key="closet">
                  <Link href={`/closet/${user.id}`}>
                    <span style={styles.clickableText}>옷장<br />보기</span>
                  </Link>
                </div>,
              ]
        }
      >
        <Card.Meta
          avatar={
            <Link href={`/user/${user.id}`} passHref>
              <Avatar style={styles.avatar} as="a">
                {user?.nickname?.[0] || "U"}
              </Avatar>
            </Link>
          }
          title={
            <Link href={`/user/${user.id}`}>
              <span style={{ color: "inherit" }}>{user?.nickname || "Unknown"}</span>
            </Link>
          }
          description={isMyProfile ? "방가방가" : "유저 프로필"}
        />

        {isMyProfile && (
          <>
          <Button
            onClick={onLogOut}
            type="primary"
            loading={logOutLoading}
            style={styles.button}
          >
            로그아웃
          </Button>
          <div style={{ textAlign: "center", marginLeft: "10px" }}>
          <Button
            icon={<UploadOutlined />}
            onClick={() => Router.push("/postupload")}
            type="primary"
            style={styles.button}
            >
            게시글 업로드
          </Button>
          </div>
          </>
        )}
      </Card>

      {postsVisible && posts.length > 0 && (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
    {posts.map((post) => (
      <Link href={`/post/${post.id.id}`} key={post.id.id}>
        
        <div
          style={{
            width: "200px",
            height: "200px",
            overflow: "hidden",
            borderRadius: "8px",
            display: "block",
            position: "relative",
          }}
        >
          <Image
            src={post.thumbnail || "/default-image.png"}
            alt="post thumbnail"
            fill
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
      </Link>
      
    ))}
  </div>
)}

    <Modal
      title="팔로워 목록"
      open={followerModalVisible}
      footer={null}
      onCancel={() => setFollowerModalVisible(false)}
    >
      <FollowList header="팔로워" data={me?.Followers ?? []} />
    </Modal>

      <Modal
        title="팔로잉 목록"
        open={followingModalVisible}
        footer={null}
        onCancel={() => setFollowingModalVisible(false)}
      >
        <FollowList header="팔로잉" data={me?.Followings ?? []} />
      </Modal>
    </>
  );
};

export default UserProfile;