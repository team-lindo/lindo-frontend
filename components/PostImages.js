import { useRef } from 'react';
import Link from 'next/link';
import { Popover } from 'antd';

const PostImages = ({ images = [], taggedProductsByImage = {} }) => {
  return (
    <>
      {images.map((image) => {
        const containerRef = useRef(null);

        return (
          <div
            key={image.id}
            style={{
              marginBottom: '16px',
              width: 'fit-content',
            }}
          >
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                display: 'inline-block',
                overflow: 'visible', 
              }}
            >
              <img
                src={image.src}
                alt="게시 이미지"
                style={{
                  display: 'block',
                  width: '600px',
                  height: '600px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />

{taggedProductsByImage?.[image.id]?.map((tag, idx) => {

  console.log('tag.name:', tag.name);
  console.log('tag.price:', tag.price);

  console.log('🧷 tag 전체:', tag);

  return (
    <Link key={idx} href={`/product/${tag.uid}`} passHref>
      <Popover
        content={
          <div>
            <p style={{ margin: 0 }}>상품명: {tag.name}</p>
            <p style={{ margin: '4px 0' }}>
              ₩{tag.price?.toLocaleString()}
            </p>
          </div>
        }
        trigger="hover"
        placement="top"
        getPopupContainer={() => containerRef.current}
      >
        <a
          style={{
            position: 'absolute',
            top: `${tag.y}%`,
            left: `${tag.x}%`,
            backgroundColor: 'white',
            color: 'red',
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '12px',
            cursor: 'pointer',
            zIndex: 10,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          🔗
        </a>
      </Popover>
    </Link>
  );
})}

            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostImages;
