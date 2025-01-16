import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";

const ImageSlider = ({ images }) => {
  // 더미 데이터를 기본 값으로 설정
  const defaultImages = [
    "dummy1.jpg",
    "dummy2.jpg",
    "dummy3.jpg",
  ];

  // images가 없으면 defaultImages를 사용
  const displayImages = images && images.length > 0 ? images : defaultImages;

  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {displayImages.map((image, index) => (
        <div key={index}>
          <img
            src={`https://via.placeholder.com/300x150?text=${image}`}
            alt={`Image ${index}`}
            className="w-full max-h-[150px]"
          />
        </div>
      ))}
    </Carousel>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string), // 필수가 아닌 Prop으로 변경
};

export default ImageSlider;

/*import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PropTypes from "prop-types";

const ImageSlider = ({ images}) => {
    return (
        <Carousel autoPlay showThumbs={false} infiniteLoop>
            {images.map((image, index) => (
                <div key={index}>
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                        alt={`Image ${index}`}
                        className='w-full max-h-[150px]'
                    />
                </div>
            ))}
        </Carousel>
    );
};
ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
*/

/*import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from "prop-types";

const ImageSlider = ({ images }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <Carousel
            autoPlay
            infinite
            showDots={false}
            responsive={responsive}
        >
            {images.map((image, index) => (
                <div key={index} className="h-auto"> 
                    <img
                        className="w-full h-full object-cover"  
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                        alt={image}
                    />
                </div>
            ))}
        </Carousel>
    );
};

ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
*/