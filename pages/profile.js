import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import UserProfile from "../components/UserProfile";
import FollowList from "../components/FollowList";
//import FollowingList from "./FollowingList";

const Profile = () => {
  const followerList = [{nickname : "test"},{nickname : "test1"},{nickname : "test2"}]
  const followingList = [{nickname : "test"},{nickname : "test1"},{nickname : "test2"}]

  return (
    <>
        <Head>
            <title> profile </title>
        </Head>
        <AppLayout>
         <UserProfile />
          <FollowList header = "팔로워 목록" data = {followerList}/>
          <FollowList header = "팔로잉 목록" data = {followingList}/>
          
        </AppLayout>
    </>
  )
}

export default Profile

