import { Avatar, Button, Card } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { logIn, logOut , setLogOutLoading} from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { me, logOutLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      logIn({
        nickname: "test",
        email: "test@example.com",
      })
    );
  }, [dispatch]);

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
        <div key="post">게시물 <br /> 0 </div>,
        <div key="follower">팔로워 <br /> 0 </div>,
        <div key="following">팔로잉 <br /> 0 </div>,
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


/*
import { Avatar, Button, Card } from "antd";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  // 로그아웃 핸들러
  const onLogOut = useCallback(() => {
    dispatch(logOut()); // logOut 사용
  }, [dispatch]);
  // 스타일 객체를 useMemo로 메모이제이션
  const styles = useMemo(
    () => ({
      cardContainer: { marginTop: "16px" }, // Card의 margin-top 스타일
      button: { marginTop: "16px" }, // Button의 margin-top 스타일
      avatar: { backgroundColor: "#87d068" }, // Avatar 스타일
    }),
    []
  );

  return (
    <Card
      style={styles.cardContainer} // Card의 스타일 적용
      actions={[
        <div key="post">게시물 <br /> 0 </div>,
        <div key="follower">팔로워 <br /> 0 </div>,
        <div key="following">팔로잉 <br /> 0 </div>,
      ]}
    >
     
      <Card.Meta
        avatar={<Avatar style={styles.avatar}>{'N'}</Avatar>} // Avatar 스타일 적용
        title="Noopy"
        description="방가 방가"
      />

     
      <Button
        onClick={onLogOut}
        type="primary"
        style={styles.button} // Button 스타일 적용
      >
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;*/
/*
import { Avatar, Button, Card } from "antd";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import FollowList from "../pages/FollowList";
import FollowingList from "../pages/FollowList";

const UserProfile = ({ setIsLogged }) => {
  // 로그아웃 핸들러
  const onLogOut = useCallback(() => {
    setIsLogged(false);
  }, [setIsLogged]); // 의존성 배열에 setIsLogged 추가

  // 스타일 객체를 useMemo로 메모이제이션
  const styles = useMemo(
    () => ({
      cardContainer: { marginTop: "16px" }, // Card의 margin-top 스타일
      button: { marginTop: "16px" }, // Button의 margin-top 스타일
      avatar: { backgroundColor: "#87d068" }, // Avatar 스타일
      actionButton: { margin: "0 8px" }, // Actions 버튼 스타일
    }),
    []
  );

  return (
    <Card
      style={styles.cardContainer} // Card의 스타일 적용
      actions={[
        <Link href="/posts" key="post">
          <Button type="link" style={styles.actionButton}>
            게시물
          </Button>
        </Link>,
        <Link href="/FollowList" key="follower">
          <Button type="link" style={styles.actionButton}>
            팔로워
          </Button>
        </Link>,
        <Link href="/FollowingList" key="following">
          <Button type="link" style={styles.actionButton}>
            팔로잉
          </Button>
        </Link>,
      ]}
    >
     
      <Card.Meta
        avatar={<Avatar style={styles.avatar}>{'N'}</Avatar>} // Avatar 스타일 적용
        title="Noopy"
        description="방가 방가"
      />

      
      <Button
        onClick={onLogOut}
        type="primary"
        style={styles.button} // Button 스타일 적용
      >
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
*/

/*import { Avatar, Button, Card } from "antd";
import { useCallback, useMemo } from "react";

const UserProfile = ({ setIsLogged }) => {
  // 로그아웃 핸들러
  const onLogOut = useCallback(() => {
    setIsLogged(false);
  }, [setIsLogged]); // 의존성 배열에 setIsLogged 추가

  // 스타일 객체를 useMemo로 메모이제이션
  const styles = useMemo(
    () => ({
      cardContainer: { marginTop: "16px" }, // Card의 margin-top 스타일
      button: { marginTop: "16px" }, // Button의 margin-top 스타일
      avatar: { backgroundColor: "#87d068" }, // Avatar 스타일
    }),
    []
  );

  return (
    <Card
      style={styles.cardContainer} // Card의 스타일 적용
      actions={[
        <div key="post">게시물 <br /> 0 </div>,
        <div key="follower">팔로워 <br /> 0 </div>,
        <div key="following">팔로잉 <br /> 0 </div>,
      ]}
    >
     
      <Card.Meta
        avatar={<Avatar style={styles.avatar}>{'N'}</Avatar>} // Avatar 스타일 적용
        title="Noopy"
        description="방가 방가"
      />

     
      <Button
        onClick={onLogOut}
        type="primary"
        style={styles.button} // Button 스타일 적용
      >
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
*/