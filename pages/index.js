import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    // Redux 상태 가져오기
    const user = useSelector((state) => state.user);
    const post = useSelector((state) => state.post);

    // user와 post가 초기화되지 않았을 경우 대비
    if (!user || !post) {
        return <div>Loading...</div>;
    }

    const { me } = user;
    const { mainPosts } = post;

    // PostForm은 로그인한 사람만 보임
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <AppLayout>
                {me && <PostForm />}
                {mainPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </AppLayout>
        </>
    );
};

export default Home;


/*import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home =()=>{
   // const {isLoggedIn}=useSelector((state)=>state.user)
   const { me } = useSelector((state) => state.user); 
   const {mainPosts}=useSelector((state)=>state.post)
//PostForm은 로그인한 사람만 보임
//map의 키를 쓸 때 변경될 거면 index를 키로 쓰면 안됨
    return (
        <>
            <Head>
                <title> home</title>
            </Head>
            <AppLayout>
                
            {me&& <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
            </AppLayout>
        </>
    )
}
export default Home;*/