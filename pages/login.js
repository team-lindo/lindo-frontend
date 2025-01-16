import AppLayout from "../components/AppLayout";
import Head from "next/head";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

const Login = () => {
  const isLogged = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Head>
        <title>login </title>
        <meta name="description" content="로그인 페이지입니다." />
      </Head>
      <AppLayout>
        {isLogged ? <UserProfile /> : <LoginForm />}
      </AppLayout>
    </>
  );
};

export default Login;



