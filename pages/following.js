import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import FollowListPage from "./FollowList";
import { useSelector } from "react-redux";

const Following = () => {
  const me = useSelector((state) => state.user.me) || { Followings: [] }; // me가 undefined일 경우 기본값 설정
  const posts = useSelector((state) => state.user.posts) || []; // posts가 undefined면 빈 배열 할당

  // 팔로우한 사람들의 ID 목록 (me가 존재하지 않으면 빈 배열 반환)
  const followingIds = me.Followings?.map((user) => user.id) || [];

  // 팔로우한 사람들의 게시물만 필터링
  const filteredPosts = (posts || []).filter((post) =>
    followingIds.includes(post?.User?.id)
  );

  return (
    <>
      <Head>
        <title>following</title>
      </Head>
      <AppLayout>
        <div>
          <h2>팔로우한 사람들의 게시물</h2>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                <strong>{post?.User?.nickname}</strong>
                <p>{post?.content}</p>
              </div>
            ))
          ) : (
            <p>팔로우한 사람이 아직 게시물을 올리지 않았어요.</p>
          )}
        </div>
        <FollowListPage />
      </AppLayout>
    </>
  );
};

export default Following;
