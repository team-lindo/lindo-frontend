import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Popover } from 'antd';

const PostImages = ({ images = [], taggedProductsByImage = {} }) => {
  const containerRefs = useRef([]);

  useEffect(() => {
    console.log('📌 PostImages 렌더링됨');
    console.log('📸 images:', images);
    console.log('🏷️ taggedProductsByImage:', taggedProductsByImage);
  }, [images, taggedProductsByImage]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((image, idx) => {
        const tags = taggedProductsByImage?.[image.id] || [];

        return (
          <div key={image.id} style={{ marginBottom: '16px', width: 'fit-content' }}>
            <div
              ref={(el) => (containerRefs.current[idx] = el)}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '600px',
                height: '600px',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <img
                src={image.src}
                alt="게시 이미지"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* 태그 표시 */}
              {tags.map((tag, tIdx) => (
                <Link key={tIdx} href={`/product/${tag.uid}`} passHref>
                  <Popover
                    content={
                      <div>
                        <p style={{ margin: 0 }}>상품명: {tag.name}</p>
                        <p>₩{tag.price?.toLocaleString()}</p>
                      </div>
                    }
                    trigger="hover"
                    getPopupContainer={() => containerRefs.current[idx]}
                  >
                    <a
                      style={{
                        position: 'absolute',
                        top: `${tag.y}%`,
                        left: `${tag.x}%`,
                        backgroundColor: 'white',
                        color: 'red',
                        padding: '4px 6px',
                        fontSize: '12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        zIndex: 10,
                      }}
                    >
                      🔗
                    </a>
                  </Popover>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostImages;
