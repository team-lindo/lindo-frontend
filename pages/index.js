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
                    typeof post.content === "string" && post.content
                      ? post.content
                      : typeof post.content === "object" && post.content.description
                      ? post.content.description
                      : typeof post.description === "string" && post.description
                      ? post.description
                      : "내용 없음",
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

/*import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import ScrollListener from "../components/ScrollListener";

const Home = () => {
  const user = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  
  // ✅ 클라이언트에서 Redux 상태가 변경될 때까지 기다리기
  const [clientLoaded, setClientLoaded] = useState(false);
  
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  //console.log("Redux user 상태:", user);
  console.log("현재 로그인한 사용자 ID:", user?.me?.id);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <AppLayout>
        {clientLoaded && user.me ? (
          <>
            <p>로그인한 사용자: {user.me.nickname}</p>
            <PostForm />
          </>
        ) : (
          <p>로그인 정보를 불러오는 중...</p>
        )}
        <ScrollListener />
        {clientLoaded &&
          mainPosts.map((post) => {
            const normalizedPost = {
              ...post,
              content:
                typeof post.content === "string" && post.content
                  ? post.content
                  : typeof post.content === "object" && post.content.description
                  ? post.content.description
                  : typeof post.description === "string" && post.description
                  ? post.description
                  : "내용 없음",
            };

            return <PostCard key={post.id || `post-${Math.random()}`} post={normalizedPost} />;
          })}
      </AppLayout>
    </>
  );
};

export default Home;
*/


/*import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { loadPosts } from "../reducers/post"; 
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
  
  const [clientLoaded, setClientLoaded] = useState(false);
  const [postKeys, setPostKeys] = useState({}); // ✅ `useState()`로 관리

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  useEffect(() => {
    dispatch(loadPosts()); 
  }, [dispatch]);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  const lastId = mainPosts?.length > 0 ? mainPosts[mainPosts.length - 1].id : 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function onScroll() {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
          if (hasMorePosts && !loadPostsLoading) {
            dispatch(loadPosts(lastId));
          }
        }
      }

      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts.length, dispatch]);

  // ✅ `post.id`가 없으면 한 번만 `uuidv4()`를 생성하여 저장
  useEffect(() => {
    setPostKeys((prevKeys) => {
      const newKeys = { ...prevKeys };
      mainPosts.forEach((post) => {
        if (!newKeys[post.id]) {
          newKeys[post.id] = uuidv4();
        }
      });
      return newKeys;
    });
  }, [mainPosts]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {clientLoaded &&
          mainPosts.map((post) => {
            const uniqueKey = post.id || postKeys[post.id]; // ✅ ID가 있으면 그대로 사용, 없으면 `uuidv4()`로 생성된 값 사용
            const normalizedPost = {
              ...post,
              content: post?.content?.description ?? post?.content ?? post?.description ?? "로딩 중...",
            };
            return <PostCard key={uniqueKey} post={normalizedPost} />;
          })}
      </AppLayout>
    </>
  );
};

export default Home;
*/


/*import { useSelector ,useEffect, useDispatch  } from "react-redux";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { me } = user;
  const mainPosts = useSelector((state) => state.post.mainPosts);

  console.log("Main Posts:", mainPosts); // Redux 데이터 확인

  if (!user || !post) {
    return <div>Loading...</div>;
  }
  const lastId = mainPosts[mainPosts.length - 1]?.id;
  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch(loadPosts(lastId));
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => {
  const normalizedPost = {
    ...post,
    content:
      typeof post.content === "string" && post.content
        ? post.content
        : typeof post.content === "object" && post.content.description
        ? post.content.description
        : typeof post.description === "string" && post.description
        ? post.description
        : "내용 없음",
  };

  console.log("Normalized Post:", normalizedPost);
  return <PostCard key={post.id} post={normalizedPost} />;
})}

      </AppLayout>
    </>
  );
};

export default Home;
*/