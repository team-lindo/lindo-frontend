import { useState,useMemo, useEffect   } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import TaggableImageUploader from './TaggableImageUploader';
import { addPost } from '../reducers/post'; 
import { fetchUserProfile ,} from '../reducers/user'; 
import { useRouter } from 'next/router';
import { message } from 'antd';
import {fetchClosetData } from "../reducers/product";


const PostUploadForm = () => {
  const router = useRouter(); 
  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.product.initialClothes);
console.log('초기 옷장 데이터:', clothes);


  const [selected, setSelected] = useState([]);
  const [hashtags, setHashtags] = useState([]); 
  const [taggedProductsByImage, setTaggedProductsByImage] = useState({}); // 기존 tagsByImage  
  const [content, setContent] = useState('');
  const [waitingTagItem, setWaitingTagItem] = useState(null);
  const { me , profileUser} = useSelector((state) => state.user);
  const uploadImage = useSelector((state) => state.post.uploadedImages);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // 서버에서 받은 URL들
    const user = useMemo(() => {
      if (!me) return null;
      return me.id === profileUser?.id ? me : profileUser;
    }, [me, profileUser]);

  // ✅ 게시 시 호출되는 함수 내부에 dispatch 코드 포함
  const handleSubmit = async () => {
   // const taggedProducts = Object.values(taggedProductsByImage).flat();
    // 옷장 전체 펼치기
  const allClothes = Object.values(clothes).flat();

// 태그에 상품 정보 주입
const taggedProducts = Object.values(taggedProductsByImage).flat().map((tag) => {
  const product = allClothes.find((item) => item.uid === tag.uid);
  return {
    ...tag,
    name: product?.name || '이름 없음',
    price: product?.price || 0,
    url: product?.url || '',
  };
});

   // 필요 시 초기화
dispatch(clearUploadedImages());
   const extractedTags = content.match(/#[^\s#]+/g)?.map(tag => tag.slice(1)) || [];
  
    // ✅ 최종적으로 Redux에 넣을 게시글 객체
    // const newPost = {
    //   user: me, 
    //   id: Date.now(), // 고유 ID
    //   content,
    //   imageUrls: uploadedImages.map((img) => img.src),
    //   hashtags: extractedTags,
    //   taggedProducts,
    //   User: { id: me?.id ?? 1, nickname: me?.nickname ?? '익명' },
    //   Comments: [],
    //   createdAt: new Date().toISOString(),
    // };
    const imageUrls = uploadImage.map((img) => img.src); // ✅ uploadedImages → imageUrls 변환

    const postData = {
      content: content.trim() || '설명이 없습니다.',
      imageUrls,
      hashtags: extractedTags,
      taggedProducts,
    };
    
    try {
      const result = await dispatch(addPost(postData));
      const newPost = {
        ...result.payload, // 서버 응답 (id, content, imageUrls, createdAt 등)
        User: { id: me.id, nickname: me.nickname },
        Comments: [],
      };
      if (result.meta.requestStatus === 'fulfilled') {
         dispatch(addPostToMe(newPost));
        // console.log("🧪 addPostToMe 직후 me.Posts:", [...(me?.Posts ?? [])]); // 🔍 상태 확인
        dispatch(fetchUserProfile(me.id));
        

        message.success('게시글이 업로드되었습니다!');
        console.log("me.Posts:", me?.Posts); // 게시글 객체 배열이 있는지
        console.log("user.Posts.length:", user?.Posts?.length); // 증가했는지

        router.push('/mypage');
      } else {
        message.error(`업로드 실패: ${result.payload}`);
      }
    } catch (err) {
      message.error('알 수 없는 오류로 업로드에 실패했습니다.');
      console.error(err);
    }
  };
  
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, [dispatch]);
  useEffect(() => {
    if (me?.id) dispatch(fetchClosetData());
  }, [me]);
  
  useEffect(() => {
  console.log('옷장 데이터:', clothes); // 이게 빈 배열인지 확인
}, [clothes]);

  const handleSelect = (item) => {
    setSelected(prev =>
      prev.find(i => i.uid === item.uid)
        ? prev.filter(i => i.uid !== item.uid)
        : [...prev, item]
    );
  };
  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
  
    try {
      const resultAction = await dispatch(uploadImage(formData));
  
      if (resultAction.type === uploadImage.fulfilled.type) {
        const uploadedImages = resultAction.payload;
      } else {
        message.error('이미지 업로드에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      message.error('예상치 못한 오류가 발생했습니다.');
    }
  };
  
  return (
    <>
      <div style={{ padding: 20 }}>
        {/* 이미지 업로드 + 태깅 */}
        <TaggableImageUploader
          clothes={clothes}
         images={uploadedImages}
          //setImages={setImageList}
           setImages={setUploadedImages}
          taggedProductsByImage={taggedProductsByImage}     // ✅
          setTaggedProductsByImage={setTaggedProductsByImage}
          hashtags={hashtags}                               // ✅
          setHashtags={setHashtags}
          waitingTagItem={waitingTagItem}
          setWaitingTagItem={setWaitingTagItem}
        />


        {/* 선택된 아이템 미리보기 */}
        {selected.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
            {selected.map(item => (
              <div key={item.uid} style={{ position: 'relative' }}>
                <Image src={item.url} width={80} height={80} alt="선택된 옷" />
                <button
                  onClick={() => handleSelect(item)}
                  style={{
                    position: 'absolute', top: 0, right: 0,
                    background: 'red', color: 'white', border: 'none', borderRadius: '50%'
                  }}
                >×</button>
              </div>
            ))}
          </div>
        )}


  {/* 게시글 내용 입력 */}
  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="오늘의 코디를 소개해주세요!"
    style={{ width: '100%', height: 100 }}
  />

</div>


        {/* 게시 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            style={{
              backgroundColor: content.trim() ? '#0070f3' : '#ccc',
              color: 'white',
              padding: '12px 32px',
              border: 'none',
              borderRadius: '24px',
              fontWeight: 'bold',
              cursor: content.trim() ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s',
            }}
          >
            게시하기
          </button>
        </div>
  
    </>
  );
};

export default PostUploadForm;
