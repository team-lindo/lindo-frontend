import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import TaggableImageUploader from './TaggableImageUploader';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../reducers/product';  
import { addPost } from '../reducers/post';           

const PostUploadForm = () => {
  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.product.initialClothes);
  const [selected, setSelected] = useState([]);
  const [imageData, setImageData] = useState(null); 
  const [tags, setTags] = useState([]); 
  const [content, setContent] = useState('');
  const [activeCategory] = useState('아우터');
  const [waitingTagItem, setWaitingTagItem] = useState(null);
  
// 게시 시 데이터 구조
const handleSubmit = () => {
  dispatch(updateProduct({
    productName: '코트',
    brand: '무신사',
    price: 99000,
    size: 'L',
    images: selected.map(i => ({ src: i.url })),
  }));
  const postData = {
    content,
    tags,
    products: selected.map((item) => ({
      productId: item.uid,
      productName: '선택된 아이템',
      category: activeCategory,
      brand: '선택 브랜드',
      price: 30000,
      size: '프리',
      description: '',
      imageTag: item.url,
      siteUrl: '',
    })),
  };
  dispatch(addPost(postData));
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
      {/* 1. 이미지 업로드 + 태깅 */}
      <TaggableImageUploader
        clothes={clothes}
        imageData={imageData}
        setImageData={setImageData}
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


      {/* 옷장 아이템 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {clothes[activeCategory]?.map(item => (
          <div
            key={item.uid}
            onClick={() => handleSelect(item)}
            style={{
              border: selected.find(i => i.uid === item.uid) ? '2px solid blue' : '1px solid #ddd',
              padding: 4, cursor: 'pointer',
            }}
          >
            <Image src={item.url} width={100} height={100} alt={activeCategory} />
          </div>
        ))}
      </div>

        {/* 텍스트 입력 영역 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘의 코디를 소개해주세요!"
          style={{ width: '100%', height: 100, marginTop: 20 }}
        />

        {/* 게시 버튼 - 페이지 맨 아래 중앙 */}
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
