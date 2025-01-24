import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import UserProfile from "../components/UserProfile";
import FollowList from "../components/FollowList";
//import FollowingList from "./FollowingList";
import { useSelector } from "react-redux";

const Profile = () => {
  
  const { me } = useSelector((state) => state.user);
  if (!me) {
    return <div>로그인이 필요합니다.</div>; // 로그인하지 않았을 때 처리
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

