import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import TaggableImageUploader from './TaggableImageUploader';
import {
  addProduct, setTagsByImage,
  resetProductState
} from '../reducers/product';
import { useRouter } from 'next/router';
import { message } from 'antd';

const PostUploadForm = () => {
  const router = useRouter(); 
  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.product.initialClothes);
  const [selected, setSelected] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [tags, setTags] = useState([]);
  //const [tagsByImage, setTagsByImage] = useState({});
  const [tagsByImage, setLocalTagsByImage] = useState({}); 
  const [content, setContent] = useState('');
  const [waitingTagItem, setWaitingTagItem] = useState(null);

  // ✅ 게시 시 호출되는 함수 내부에 dispatch 코드 포함
  const handleSubmit = () => {
    const postData = {
      content,
      images: imageList,
      tags,
      tagsByImage,
    };
    console.log("게시할 데이터:", postData);

    // ✅ Redux에 products 추가
    imageList.forEach((img) => {
      dispatch(addProduct({
        id: img.id,
        image: img.url,
        tags: tagsByImage[img.id] || [],
      }));
    });

    // ✅ 태그 정보 전역 저장
    dispatch(setTagsByImage(tagsByImage));

    // ✅ 초기화
    dispatch(resetProductState());
    message.success(' 게시가 완료되었습니다!', 1.5);
  
    setTimeout(() => {
      router.push('/mypage');
    }, 1500); // 알림 표시 후 페이지 이동
  };

  const handleSelect = (item) => {
    setSelected(prev =>
      prev.find(i => i.uid === item.uid)
        ? prev.filter(i => i.uid !== item.uid)
        : [...prev, item]
    );
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        {/* 이미지 업로드 + 태깅 */}
        <TaggableImageUploader
          clothes={clothes}
          images={imageList}
          setImages={setImageList}
          tagsByImage={tagsByImage}
          setTagsByImage={setLocalTagsByImage} 
          tags={tags}
          setTags={setTags}
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

        {/* 텍스트 입력 영역 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘의 코디를 소개해주세요!"
          style={{ width: '100%', height: 100, marginTop: 20 }}
        />

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
      </div>
    </>
  );
};

export default PostUploadForm;
