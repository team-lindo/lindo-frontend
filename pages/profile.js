import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import UserProfile from "../components/UserProfile";
import FollowList from "../components/FollowList";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!me?.id) {
      setIsRedirecting(true);
      Router.push('/');
    }
  }, [me]);

  if (!me || isRedirecting) {
    return <div>로그인이 필요합니다...</div>; 
  }

  const followerList = [{ nickname: "test" }, { nickname: "test1" }, { nickname: "test2" }];
  const followingList = [{ nickname: "test" }, { nickname: "test1" }, { nickname: "test2" }];

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <AppLayout>
        <UserProfile />
        <FollowList header="팔로워 목록" data={me?.Followers ?? followerList} />
        <FollowList header="팔로잉 목록" data={me?.Followings ?? followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;




/*import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import UserProfile from "../components/UserProfile";
import FollowList from "../components/FollowList";
//import FollowingList from "./FollowingList";
import { useSelector } from "react-redux";
import Router from 'next/router';

const Profile = () => {

  const { me } = useSelector((state) => state.user);
  if (!me) {
    return <div>로그인이 필요합니다.</div>; 
  }

  const followerList = [{nickname : "test"},{nickname : "test1"},{nickname : "test2"}]
  const followingList = [{nickname : "test"},{nickname : "test1"},{nickname : "test2"}]

  return (
    <>
        <Head>
            <title> profile </title>
        </Head>
        <AppLayout>
         <UserProfile />
          <FollowList header = "팔로워 목록" data = {me.Followers}/>
          <FollowList header = "팔로잉 목록" data = {me.Followings}/>
      
        </AppLayout>
    </>
  )
}

export default Profile

*/