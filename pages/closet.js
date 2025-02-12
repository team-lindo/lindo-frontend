import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import ClosetForm from "../components/ClosetForm"; 

const Closet = () => {
  const { me } = useSelector((state) => state.user ?? {}); 
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.replace("/login"); 
    }
  }, [me, router]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>closet</title>
      </Head>
      <AppLayout>
        <ClosetForm me={me} />
      </AppLayout>
    </>
  );
};

export default Closet;
