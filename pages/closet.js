import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import ClosetForm from "../components/ClosetForm";
import  { setClosetItems, initialClothes, fetchClosetData } from "../reducers/product";

const Closet = () => {
  const { me } = useSelector((state) => state.user || {}); 
  const router = useRouter();
  const dispatch = useDispatch();
  const { closetItems, fetchClosetLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (!me) {
      router.push("/login");
    }
  }, [me, router]);

useEffect(() => {
  if (me?.id) {
    dispatch(fetchClosetData()).then((result) => {
      const clothes = result.payload;
      if (!clothes || clothes.length === 0) {
        dispatch(setClosetItems(initialClothes));
         console.log("옷장 데이터 응답:", result);  // 더미 옷장 사용
      }
    });
  }
}, [me]);


  // ✅ 여기서 조건부 렌더링 (return null 제거)
  if (!me) {
    return <div>Loading...</div>; // 또는 스피너 등
  }

  return (
    <>
      <Head>
        <title>closet</title>
      </Head>
      <AppLayout>
        <ClosetForm clothesData={closetItems} isOwner={true} />
      </AppLayout>
    </>
  );
};

export default Closet;
