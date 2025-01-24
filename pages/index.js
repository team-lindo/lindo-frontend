import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);

  const { me } = user;
  const mainPosts = useSelector((state) => state.post.mainPosts);

  console.log("Main Posts:", mainPosts); // Redux 데이터 확인

  // 로딩 상태 확인 (필요 시 추가)
  if (!user || !post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post, index) => {
          const normalizedPost = {
            ...post,
            content:
              typeof post.content === "object" && post.content.description
                ? post.content.description // content.description이 있으면 사용
                : typeof post.description === "string"
                ? post.description // description이 있으면 사용
                : "내용 없음", // 기본값
          };

          console.log("Normalized Post:", normalizedPost);

          return <PostCard key={normalizedPost.id} post={normalizedPost} />;
        })}
      </AppLayout>
    </>
  );
};

export default Home;
