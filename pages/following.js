import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import FollowListPage from "./FollowList";
const Following = () => {
  return (
    <>
        <Head>
            <title> following </title>
        </Head>
        <AppLayout>
            팔로워들 게시물
          <FollowListPage />
        </AppLayout>
    </>
  )
}

export default Following
