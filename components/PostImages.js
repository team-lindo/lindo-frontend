import { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Image from 'next/image';
import ImagesZoom from './ImagesZoom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostImages = ({ images = [] }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = () => {
    setShowImagesZoom(true);
  };
  const onClose = () => {
    setShowImagesZoom(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: false, 
  };

  return (
    <>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={image.id || index}>
              <Image
                src={image.src}
                alt={`Post image ${index + 1}`}
                width={600}
                height={400}
                onClick={onZoom}
                priority
                //priority={index === 0} // 첫 번째 이미지에만 priority 적용
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // id 추가
      src: PropTypes.string.isRequired,
    })
  ),
};

export default PostImages;
