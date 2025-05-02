import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, Avatar, Button, Modal } from "antd";
import FollowList from "./FollowList";
import  LoginForm from "../components/LoginForm";
import { fakeApi,logOut,setLogOutLoading  } from "../reducers/user";
import Link from "next/link";
import Image from "next/image";
import { UploadOutlined } from "@ant-design/icons";
import Router from "next/router";

const UserProfile = ({ userId: propUserId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const [userId, setUserId] = useState(null);
  const [viewedUser, setViewedUser] = useState(null);
  const [postsVisible, setPostsVisible] = useState(true);
  const [followerModalVisible, setFollowerModalVisible] = useState(false);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);
  const logOutLoading = useSelector((state) => state.user.logOutLoading);

  // userId 설정 (router or props)
  useEffect(() => {
    if (propUserId) {
      setUserId(propUserId);
    } else if (router.isReady && router.query.id) {
      const id = parseInt(router.query.id, 10);
      if (!isNaN(id)) {
        setUserId(id);
      } else {
        console.warn("잘못된 ID입니다:", router.query.id);
      }
    }
  }, [propUserId, router.isReady, router.query.id]);

  // fetchUser
  useEffect(() => {
    if (!userId || !router.isReady) return;

    const fetchUser = async () => {
      try {
        const res = await fakeApi.getUserById(userId);
        if (res?.data) {
          setViewedUser(res.data);
        }
      } catch (err) {
        console.error("유저 정보 가져오기 실패:", err);
      }
    };
    fetchUser();
  }, [userId, router.isReady]);

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

 

  const user = me.id === userId ? me : viewedUser;
  const isMyProfile = useMemo(() => {
    if (!me || !userId) return false;
    return me.id === userId;
  }, [me, userId]);
  if (!me) return <LoginForm />;
  if (!user) return null;

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
                  onClick={() => setPostsVisible((prev) => !prev)}
                >
                  게시물<br />
                  {user?.Posts?.length || 0}
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
                  onClick={() => setPostsVisible((prev) => !prev)}
                >
                  게시물<br />
                  {user?.Posts?.length || 0}
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

      {postsVisible && user.Posts?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
          {user.Posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div
                style={{
                  width:"200px",
                  height:"200px",
                  overflow:"hidden",
                  borderRadius: "8px",
                  display: "block",
                }}
              >
                <Image
                  src={post.Images?.[0]?.src || "/default-image.png"}
                  alt="post thumbnail"
                  width={200}
                  height={200}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
        <FollowList header="팔로워" data={user?.Followers ?? []} />
      </Modal>

      <Modal
        title="팔로잉 목록"
        open={followingModalVisible}
        footer={null}
        onCancel={() => setFollowingModalVisible(false)}
      >
        <FollowList header="팔로잉" data={user?.Followings ?? []} />
      </Modal>
    </>
  );
};

export default UserProfile;
