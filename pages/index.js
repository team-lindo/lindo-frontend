import Head from "next/head";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Layout, Card } from "antd";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import {generateDummyPost} from "../reducers/post"; // generateDummyPost 함수
const { Content } = Layout;

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const isLoggedIn = !!me;

  const [clientLoaded, setClientLoaded] = useState(false);
  const dummyPosts = generateDummyPost(10); // 미리 생성해둠
  const followings = me?.Followings || [];

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <AppLayout>
        <Content style={{ padding: "20px" }}>
          <Row gutter={[16, 16]} justify="center">
            {clientLoaded ? (
              isLoggedIn ? (
                followings.length > 0 ? (
                  followings.flatMap((user) =>
                    (user.Posts || []).map((post) => {
                      const normalizedPost = {
                        ...post,
                        User: { id: user.id, nickname: user.nickname },
                        content:
                          typeof post.content === "object"
                            ? post.content.description
                            : post.content,
                      };

                      return (
                        <Col span={6} key={post.id}>
                          <Card
                            hoverable
                            style={{
                              borderRadius: "12px",
                              textAlign: "center",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <PostCard post={normalizedPost} />
                          </Card>
                        </Col>
                      );
                    })
                  )
                ) : (
                  <p>팔로우한 사람이 아직 게시물을 올리지 않았어요.</p>
                )
              ) : (
                dummyPosts.map((post) => (
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
              )
            ) : null}
          </Row>
        </Content>
      </AppLayout>
    </>
  );
};

export default Home;



/*import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout, Menu, Row, Col, Card } from "antd";

import PostCard from "../components/PostCard";
import ScrollListener from "../components/ScrollListener";
import { getMenuItems, getCombinedMenuItems } from "../components/menuItems"; // ✅ named import

const { Header, Content } = Layout;

const Home = () => {
  const router = useRouter();
  const { pathname } = router; // ✅ 현재 경로 얻기
  const { me } = useSelector((state) => state.user);
  const { mainPosts = [] } = useSelector((state) => state.post);

  const [clientLoaded, setClientLoaded] = useState(false);
  useEffect(() => {
    setClientLoaded(true); // 클라이언트에서만 렌더링될 수 있게
  }, []);

  const menuItems = getMenuItems(!!me, me?.nickname);
  const combinedItems = getCombinedMenuItems(pathname); // ✅ 현재 경로 기반 스타일 적용

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout>
       
        <Header style={{ background: "#fff", borderBottom: "1px solid #d9d9d9", padding: "10px 20px" }}>
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ borderBottom: "none", justifyContent: "flex-end" }}
          />
        </Header>

     
        <Menu
          mode="horizontal"
          items={combinedItems}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            padding: "0 20px",
            borderBottom: "1px solid #d9d9d9",
          }}
        />


        <Content style={{ padding: "20px 200px" }}>
          <ScrollListener />

          <Row gutter={[16, 16]} justify="start">
            {clientLoaded &&
              mainPosts.map((post) => {
                const normalizedPost = {
                  ...post,
                  content:
                    typeof post.content === "string"
                      ? post.content
                      : post.content?.description || post.text?.description || "내용 없음",
                };

                return (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} key={post.id || `post-${Math.random()}`}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <PostCard post={normalizedPost} />
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Home;
*/