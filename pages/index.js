import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Layout, Card } from "antd";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
//import { getPosts } from "../reducers/user"; 
const { Content } = Layout;

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.getPostsLoading);

  const isLoggedIn = !!me;
  const [clientLoaded, setClientLoaded] = useState(false);

  // ✅ 비로그인 유저: 서버에서 게시물 불러오기
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getPosts({ page: 1, limit: 10 }));
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  // ✅ 표시할 게시물 정리
  let visiblePosts = [];
  if (isLoggedIn) {
    const followingsPosts = me.Followings?.flatMap(f => f.Posts || []) || [];
    visiblePosts = followingsPosts.map(post => ({
      ...post,
      User: post.User || { id: me.id, nickname: me.nickname },
    }));
  } else {
    visiblePosts = posts;
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <AppLayout>
        <Content style={{ padding: "20px" }}>
          <Row gutter={[16, 16]} justify="center">
            {clientLoaded ? (
              loading ? (
                <p>불러오는 중...</p>
              ) : visiblePosts.length > 0 ? (
                visiblePosts.map((post) => (
                  <Col span={6} key={post.id}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <PostCard post={post} />
                    </Card>
                  </Col>
                ))
              ) : (
                <p>게시글이 없습니다.</p>
              )
            ) : null}
          </Row>
        </Content>
      </AppLayout>
    </>
  );
};

export default Home;
