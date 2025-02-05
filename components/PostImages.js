import { useState } from 'react';
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
    infinite: false,
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




