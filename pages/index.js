import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import PostCard from "../components/PostCard";
import ScrollListener from "../components/ScrollListener";
import { Layout, Menu, Row, Col, Card } from "antd";
import { getMenuItems, combinedMenuItems } from "../components/menuItems"; // ✅ getMenuItems로 변경

const { Header, Content } = Layout;

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts = [] } = useSelector((state) => state.post);

  // 클라이언트에서 Redux 상태 변경 감지
  const [clientLoaded, setClientLoaded] = useState(false);
  
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  // ✅ menuItems를 useSelector()에서 가져온 Redux 상태를 사용하여 동적으로 생성
  const menuItems = getMenuItems(!!me, me?.nickname);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        {/*  상단 메뉴 */}
        <Header style={{ background: "#fff", borderBottom: "1px solid #d9d9d9", padding: "10px 20px" }}>
          <Menu mode="horizontal" items={menuItems} style={{ borderBottom: "none", justifyContent: "flex-end" }} />
        </Header>

        {/*  로고 및 주요 네비게이션 메뉴 */}
        <Menu
          mode="horizontal"
          items={combinedMenuItems}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            padding: "0 20px",
            borderBottom: "1px solid #d9d9d9",
          }}
        />

        {/*  메인 */}
        <Content style={{ padding: "20px" }}>
          <ScrollListener />
          
          <Row gutter={[16, 16]} justify="start">
            {clientLoaded &&
              mainPosts.map((post, index) => {
                const normalizedPost = {
                  ...post,
                  content:
                    typeof post.content === "string" && post.content.length > 0
                      ? post.content  // `content`가 문자열이고, 길이가 0보다 클 경우 그대로 사용
                      : post.content && typeof post.content === "object" && post.content.description
                      ? post.content.description // `content`가 객체일 경우 description 사용
                      : post.text?.description || "내용 없음",  // `text.description` 사용, 없으면 기본값
                };
                
                
                return (
                  <Col
                    xs={24} sm={12} md={8} lg={6} xl={6}
                    key={post.id || `post-${Math.random()}`} // ✅ 올바른 템플릿 문자열 사용
                  >
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
