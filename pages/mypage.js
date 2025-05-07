// pages/mypage.js
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
// 동적 import로 클라이언트 사이드 전용 컴포넌트 로딩 (SSR 방지 시 유용)
const UserProfile = dynamic(() => import('../components/UserProfile'), {
  ssr: false,
});

const MyPage = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!me?.id) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [me?.id]);

  if (!me?.id) return null;

  return (
        <AppLayout>
          <Head>
            <title>마이페이지</title>
          </Head>
  <UserProfile userId={me.id} />
      </AppLayout>);
};

export default MyPage;
