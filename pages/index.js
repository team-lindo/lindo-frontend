import Head from "next/head";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Layout, Card } from "antd";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import {generateMinimalPosts  } from "../reducers/post";

const { Content } = Layout;

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const isLoggedIn = !!me;

  const [clientLoaded, setClientLoaded] = useState(false);
  const dummyPosts = generateMinimalPosts (10);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  // ✅ 로그인한 경우: 내 게시글 + 팔로잉한 사람 게시글
  let visiblePosts = [];
  if (isLoggedIn) {
    const myPosts = me.Posts || [];
    const followingsPosts = me.Followings?.flatMap(f => f.Posts || []) || [];
    visiblePosts = [...myPosts, ...followingsPosts].map(post => ({
      ...post,
      User: post.User || { id: me.id, nickname: me.nickname },
    }));
  } else {
    visiblePosts = dummyPosts;
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
              visiblePosts.length > 0 ? (
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
