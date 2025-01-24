import { Avatar, Button, Card } from "antd";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { logIn, logOut , setLogOutLoading} from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { me, logOutLoading } = useSelector((state) => state.user);

  /*useEffect(() => {
    dispatch(
      logIn({
        nickname: "test",
        email: "test@example.com",
        Posts: [], // 게시물 초기화
        Followers: [],
        Followings: [],
      })
    );    

  }, [dispatch]);*/


  const onLogOut = useCallback(() => {
    dispatch(setLogOutLoading(true)); // 로그아웃 로딩 상태 활성화
    setTimeout(() => {
      dispatch(logOut()); // Redux 상태 초기화
      router.push("/"); // 홈 화면으로 리다이렉트
    }, 1000); // 1초 후 상태 초기화
  }, [dispatch, router]);

  const styles = useMemo(
    () => ({
      cardContainer: { marginTop: "16px" },
      button: { marginTop: "16px" },
      avatar: { backgroundColor: "#87d068" },
    }),
    []
  );

  return (
    <Card
      style={styles.cardContainer}
      actions={[
        <div key="post">게시물 <br /> {me?.Posts?.length || 0}</div>,
        <div key="follower">팔로워 <br />{me.Followers.length}</div>,
        <div key="following">팔로잉 <br /> {me.Followings.length} </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar style={styles.avatar}>{me?.nickname?.[0] }</Avatar>}
        title={me?.nickname }
        description="방가 방가"
      />
      <Button
        onClick={onLogOut}
        type="primary"
        loading={logOutLoading}
        style={styles.button}
      >
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;

