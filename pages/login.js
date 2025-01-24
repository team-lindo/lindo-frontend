import AppLayout from "../components/AppLayout";
import Head from "next/head";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { logIn } from "../reducers/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
 // const isLogged = useSelector((state) => state.user.isLoggedIn);
 const { me } = useSelector((state) => state.user);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(
    logIn({
      nickname: "test",
      email: "test@example.com",
    })
  );
}, [dispatch]);
  return (
    <>
      <Head>
        <title>login </title>
        <meta name="description" content="로그인 페이지입니다." />
      </Head>
      <AppLayout>
        {me ? <UserProfile user={me}  /> : <LoginForm />}
      </AppLayout>
    </>
  );
};

export default Login;



