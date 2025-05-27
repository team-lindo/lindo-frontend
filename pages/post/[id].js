// ✅ PostPage.js
import { wrapper } from '../../store/configureStore';
import { loadPost } from '../../reducers/post';
import PostDetail from '../../components/PostDetail';

const PostPage = () => {
  return <PostDetail />;
};

export const getStaticPaths = async () => {
  return {
    paths: [], // 동적 라우팅
    fallback: 'blocking',
  };
};

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  const idParam = context.params?.id;
  const id = Number(idParam);
  console.log("🔥 Fetching post for id:", id);

  if (!id || isNaN(id)) {
    console.log("❌ Invalid ID");
    return { notFound: true };
  }

  const result = await store.dispatch(loadPost( {id} ));
  console.log("📦 loadPost result =", result);

  if (!result.payload || !result.payload.id) {
    console.log("❌ No post found for id:", id);
    return { notFound: true };
  }

  return {
    props: {},
    revalidate: 10,
  };
});


export default PostPage;
