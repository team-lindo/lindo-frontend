import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import ClosetForm from "../components/ClosetForm";
import  { initialClothes,fetchClosetData } from "../reducers/product";

const Closet = () => {
  const { me } = useSelector((state) => state.user || {}); 
  const router = useRouter();
  const dispatch = useDispatch();
  const { closetItems, fetchClosetLoading } = useSelector((state) => state.product);
  useEffect(() => {
    if (!me) {
      router.push("/login"); // push를 사용하면 유저가 뒤로 가기를 할 수 있음.
    }
  }, [me, router]);


  if (typeof window !== "undefined" && !me) {
  return null; // 클라이언트에서만 실행하도록 체크
}

  useEffect(() => {
    if (me?.id) dispatch(fetchClosetData());
  }, [me]);
  
return (
    <>
      <Head>
        <title>closet</title>
      </Head>
      <AppLayout>
        <ClosetForm 
        clothesData={closetItems } isOwner={true}/>
      </AppLayout>
    </>
  );
};

export default Closet;
