import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import OtherUserProfile from "../../components/OtherUserProfile";


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


  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <AppLayout>
        <div style={{ padding: '0 200px' }}> 
          <OtherUserProfile UserProfile userId={me.id} />

          {/* <FollowList header="팔로워 목록" data={me?.Followers ?? followerList} />
          <FollowList header="팔로잉 목록" data={me?.Followings ?? followingList} /> */}
        </div>
    </AppLayout>
    </>
  );
};

export default Profile;

