import { useState, useRef } from 'react';
import Image from 'next/image';
import shortId from 'shortid';

const TaggableImageUploader = ({ clothes ,  waitingTagItem,
  setWaitingTagItem,  images,
  setImages,
  tagsByImage,
  setTagsByImage,}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');
  const imageRef = useRef(null);

  const handleFiles = (fileList) => {
    const newImages = Array.from(fileList).map(file => ({
      id: shortId.generate(),
      url: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
  };

  const handleImageClick = (e) => {
    if (!waitingTagItem || !imageRef.current || !images[selectedIndex]) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const currentImageId = images[selectedIndex].id;
    setTagsByImage(prev => ({
      ...prev,
      [currentImageId]: [...(prev[currentImageId] || []), { ...waitingTagItem, x, y }]
    }));
    setWaitingTagItem(null);
  };

  const removeTag = (imageId, uid) => {
    setTagsByImage(prev => ({
      ...prev,
      [imageId]: prev[imageId].filter(tag => tag.uid !== uid)
    }));
  };

  const removeImage = (index) => {
    const imageId = images[index].id;
    const newImages = images.filter((_, i) => i !== index);
    const newTags = { ...tagsByImage };
    delete newTags[imageId];
    setImages(newImages);
    setTagsByImage(newTags);
    if (selectedIndex >= newImages.length) {
      setSelectedIndex(Math.max(newImages.length - 1, 0));
    }
  };

  const currentImage = images[selectedIndex];
  const currentTags = tagsByImage[currentImage?.id] || [];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>게시글 업로드</h2>

      {/* 드래그 앤 드롭 영역 */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
          border: '2px dashed #ccc',
          padding: 20,
          textAlign: 'center',
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <p>이미지를 여러 장 드래그해서 업로드하거나 클릭하여 선택하세요</p>
        <input type="file" accept="image/*" multiple onChange={handleFileInputChange} />
      </div>

      {/* 이미지 선택 + 태깅 */}
      {currentImage && (
        <div
          style={{ position: 'relative', width: 400, height: 400, margin: '0 auto' }}
          onClick={handleImageClick}
        >
          <img
            ref={imageRef}
            src={currentImage.url}
            alt="업로드 미리보기"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {currentTags.map((tag) => (
            <div
              key={tag.uid}
              style={{
                position: 'absolute',
                top: `${tag.y}%`,
                left: `${tag.x}%`,
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: 12,
                cursor: 'default',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {tag.uid}
              <button
                onClick={() => removeTag(currentImage.id, tag.uid)}
                style={{
                  marginLeft: 6,
                  background: 'red',
                  border: 'none',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  color: 'white',
                  fontSize: 10,
                  cursor: 'pointer',
                }}
              >×</button>
            </div>
          ))}
        </div>
      )}

      {/* 이미지 리스트 탭 */}
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 10, marginTop: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {images.map((img, idx) => (
            <div key={img.id} style={{ position: 'relative' }}>
              <Image
                src={img.url}
                alt="썸네일"
                width={60}
                height={60}
                style={{
                  border: idx === selectedIndex ? '2px solid blue' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedIndex(idx)}
              />
              <button
                onClick={() => removeImage(idx)}
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  fontSize: 10,
                  cursor: 'pointer',
                }}
              >×</button>
            </div>
          ))}
        </div>
      )}

      {/* 태그된 상품 미리보기 */}
      {currentTags.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h4 style={{ textAlign: 'center' }}>태그된 상품</h4>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {currentTags.map((tag) => (
              <div key={tag.uid} style={{ position: 'relative' }}>
                <Image src={tag.url} width={80} height={80} alt="태그 상품" />
                <button
                  onClick={() => removeTag(currentImage.id, tag.uid)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    fontSize: 10,
                    cursor: 'pointer',
                  }}
                >×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 카테고리 탭 */}
      <div style={{ display: 'flex', gap: 10, marginTop: 30, marginBottom: 10 }}>
        {Object.keys(clothes).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '8px 16px',
              background: category === activeCategory ? '#000' : '#ccc',
              color: category === activeCategory ? '#fff' : '#000',
              borderRadius: 20,
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 옷 선택 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {clothes[activeCategory]?.map((item) => (
          <div
            key={item.uid}
            onClick={() => setWaitingTagItem(item)}
            style={{
              border: waitingTagItem?.uid === item.uid ? '2px solid blue' : '1px solid #ddd',
              padding: 4,
              cursor: 'pointer',
            }}
          >
            <Image src={item.url} width={100} height={100} alt={activeCategory} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaggableImageUploader;
