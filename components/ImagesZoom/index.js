import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import Image from 'next/image';

import { Overlay, Global, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  //console.log('ImagesZoom props:', images); // 전달된 props 확인

  const [currentSlide, setCurrentSlide] = useState(0);

  const uniqueImages = useMemo(() => {
    return Array.from(new Map(images.map((img) => [img.src, img])).values());
  }, [images]);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
            infinite={false} // 무한 스크롤 비활성화
            arrows={true}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {uniqueImages.map((v, i) => (
              <ImgWrapper key={v.src}>
                <Image
                  src={`${v.src.replace(/\/thumb\//, '/original/')}`}
                  alt={`이미지 ${i + 1}`}
                  width={300}
                  height={300}
                  priority
                  unoptimized
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {uniqueImages.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;

/*import  { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import Image from 'next/image';

import { Overlay, Global, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from './styles';
//import { backUrl } from '../../config/config';

const ImagesZoom = ({ images, onClose }) => {
    console.log('ImagesZoom props:', images); // 전달된 props 확인

  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite 
            arrows={true}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v, i) => (
              <ImgWrapper key={v.src}>
                <Image src={`${v.src.replace(/\/thumb\//, '/original/')}`}
                  alt={`이미지 ${i + 1}`}
                  width={300}
                  height={300}/>
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
*/