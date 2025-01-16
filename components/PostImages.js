import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Image from 'next/image';
import ImagesZoom from './ImagesZoom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostImages = ({images= []}) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = () => {
    setShowImagesZoom(true);
  };
  const onClose = () => {
    setShowImagesZoom(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image.src}
                role="presentation"
                alt={image.src}
                width={600}
                height={400}
                onClick={onZoom}
                priority
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div>No Images Available</div>
      )}
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostImages;




/*import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';

import ImagesZoom from './ImagesZoom'; // 별도의 이미지 확대 컴포넌트
import { backUrl } from '../config/config'; // 필요한 경우 설정 파일

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={`${backUrl}${images[0].src}`}
          alt={images[0].src}
          fill
          style={{ objectFit: 'contain' }}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div>
        <div style={{ display: 'inline-block', width: '150px', height: '150px', position: 'relative' }}>
          <Image
            src={`${backUrl}${images[0].src}`}
            alt={images[0].src}
            fill
            style={{ objectFit: 'cover' }}
            onClick={onZoom}
          />
        </div>
        <div style={{ display: 'inline-block', width: '150px', height: '150px', position: 'relative' }}>
          <Image
            src={`${backUrl}${images[1].src}`}
            alt={images[1].src}
            fill
            style={{ objectFit: 'cover' }}
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', position: 'relative' }}>
        <div style={{ flex: 1, marginRight: '10px', position: 'relative', height: '300px' }}>
          <Image
            src={`${backUrl}${images[0].src}`}
            alt={images[0].src}
            fill
            style={{ objectFit: 'contain' }}
            onClick={onZoom}
          />
        </div>
        <div
          role="presentation"
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
          }}
          onClick={onZoom}
        >
          <PlusOutlined style={{ fontSize: 24 }} />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
};

PostImages.defaultProps = {
  images: [],
};

export default PostImages;
*/