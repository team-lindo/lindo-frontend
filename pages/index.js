import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Layout, Card } from "antd";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import { loadPosts } from "../reducers/post";
import { loadMyInfo } from "../reducers/user"; 
const { Content } = Layout;

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.getPostsLoading);
console.log('🔥 홈에서 posts:', posts);
  const [clientLoaded, setClientLoaded] = useState(false);
  const isLoggedIn = !!me?.id;

  useEffect(() => {
    setClientLoaded(true);
  }, []);

useEffect(() => {
  if (isLoggedIn) {
    dispatch(loadMyInfo()); // ✅ 로그인 유저 정보 요청
  } else {
    dispatch(loadPosts()); // ✅ 비로그인일 때 전체 게시글
  }
}, [dispatch, isLoggedIn]);

  // ✅ 표시할 게시물 선언
  let visiblePosts = [];

  if (isLoggedIn) {
    const myPosts = me.Posts || [];
    const followingsPosts = me.Followings?.flatMap(f => f.Posts || []) || [];

    visiblePosts = [...myPosts, ...followingsPosts].map(post => ({
      ...post,
      User: post.User || { id: me.id, nickname: me.nickname }, // Fallback
    }));
  } else {
    visiblePosts = posts;
  }
console.log('🖼️ 썸네일:', posts.map(p => p.thumbnail));
if (me) {
  console.log("✅ me.Posts:", me.Posts);
  console.log("✅ me.Followings:", me.Followings);
} else {
  console.log("⚠️ me is null or undefined");
}


  console.log("📄 visiblePosts:", visiblePosts);

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
// import Head from "next/head";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { Row, Col, Layout, Card } from "antd";
// import AppLayout from "../components/AppLayout";
// import PostCard from "../components/PostCard";
// import { loadPosts } from "../reducers/post";

// const { Content } = Layout;

// const Home = () => {
//   const dispatch = useDispatch();
//   const { me } = useSelector((state) => state.user);
//   const posts = useSelector((state) => state.post.posts);
//   const loading = useSelector((state) => state.post.getPostsLoading);

//   const [clientLoaded, setClientLoaded] = useState(false);
//   const isLoggedIn = !!me?.id;

//   useEffect(() => {
//     setClientLoaded(true);
//   }, []);

//   // 🔍 비로그인 유저만 전체 게시글 요청
//   useEffect(() => {
//     if (!isLoggedIn) {
//       dispatch(loadPosts()); // 전체 게시글 불러오기 (비로그인 전용)
//     }
//   }, [dispatch, isLoggedIn]);

//   // ✅ 표시할 게시물 선언
//   let visiblePosts = [];

//   if (isLoggedIn) {
//     const myPosts = me.Posts || [];
//     const followingsPosts = me.Followings?.flatMap(f => f.Posts || []) || [];

//     visiblePosts = [...myPosts, ...followingsPosts].map(post => ({
//       ...post,
//       User: post.User || { id: me.id, nickname: me.nickname }, // Fallback
//     }));
//   } else {
//     visiblePosts = posts;
//   }

//   console.log("🧑 me:", me);
//   console.log("📄 visiblePosts:", visiblePosts);

//   return (
//     <>
//       <Head>
//         <title>Home</title>
//       </Head>
//       <AppLayout>
//         <Content style={{ padding: "20px" }}>
//           <Row gutter={[16, 16]} justify="center">
//             {clientLoaded ? (
//               loading ? (
//                 <p>불러오는 중...</p>
//               ) : visiblePosts.length > 0 ? (
//                 visiblePosts.map((post) => (
//                   <Col span={6} key={post.id}>
//                     <Card
//                       hoverable
//                       style={{
//                         borderRadius: "12px",
//                         textAlign: "center",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                       }}
//                     >
//                       <PostCard post={post} />
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <p>게시글이 없습니다.</p>
//               )
//             ) : null}
//           </Row>
//         </Content>
//       </AppLayout>
//     </>
//   );
// };

// export default Home;
