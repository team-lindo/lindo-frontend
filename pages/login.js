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



/*import AppLayout from "../components/AppLayout";
import Head from "next/head";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from 'react-redux';

import { useState } from "react";

const Login = ({children}) => {
  //const [isLogged, setIsLogged] = useState(false); // 로그인 상태 관리
  const isLogged = useSelector((state) =>  state.user.isLoggedIn);
  return (
    <>
      <Head>
        <title>Login | LOGO</title>
      </Head>
      <AppLayout>
         {isLogged ? (
          <UserProfile setIsLogged={setIsLogged} /> // 로그아웃 시 isLogged를 false로 설정
        ) : (
          <LoginForm setIsLogged={setIsLogged} /> // 로그인 시 isLogged를 true로 설정
        )} 
      
      </AppLayout>
    </>
  );
};

export default Login;
*/