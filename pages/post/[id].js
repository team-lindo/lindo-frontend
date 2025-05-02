import { wrapper } from '../../store/configureStore';
import { loadPost } from '../../reducers/post';
import PostDetail from '../../components/PostDetail';

const PostPage = () => {
  return <PostDetail />;
};

export const getStaticPaths = async () => {
  return {
    paths: [], // 빌드 타임에 생성할 경로가 있다면 여기에 추가
    fallback: 'blocking', // 없는 경로는 요청 시에 생성
  };
};
//getStaticProps에서는 dispatch만 해서 서버 측에서 데이터를 미리 불러오고, 그걸로 빌드 타임에 페이지를 렌더링할 수 있도록
export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  const id = context.params?.id;
  console.log("🧪 getStaticProps - id:", id);

  if (!id) {
    return { notFound: true };
  }

  // dispatch로 데이터를 미리 fetch (Thunk 기반)
  const result = await store.dispatch(loadPost({ id }));

  if (!result.payload || !result.payload.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    revalidate: 10, // ISR
  };
});

export default PostPage;
