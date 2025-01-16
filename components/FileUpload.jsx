import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const FileUpload = ({ onImageChange, images }) => {
  const user = useSelector((state) => state.user.user); // 로그인한 사용자 정보 가져오기

  
  // 파일 업로드 처리
  const handleUpload = (file) => {
    if (!user) {
      alert("로그인이 필요합니다!");
      return false; // 업로드 중단
    }

    // 더미 데이터 사용
    const dummyResponse = {
      data: {
        filename: "dummy_image_" + Date.now() + ".jpg",
      },
    };

    try {
      console.log("Uploaded file:", file);
      console.log("Uploaded by user:", user);

      onImageChange([...images, dummyResponse.data.filename]);
    } catch (error) {
      console.error("Upload Error:", error);
    }

    // 기본 업로드 동작 방지
    return false;
  };

  // 이미지 삭제 처리
  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div>
      {/* Upload 컴포넌트 */}
      <Upload
        beforeUpload={handleUpload} // 업로드 처리
        showUploadList={false} // 기본 업로드 목록 숨김
      >
        <Button icon={<UploadOutlined />}>이미지 업로드</Button>
      </Upload>

      {/* 업로드된 이미지 목록 */}
      <div className="flex gap-4 mt-4">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px] border"
              src={`https://via.placeholder.com/300?text=${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;


/*import Dropzone from "react-dropzone";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    console.log("Dropped files:", files); // 파일 배열 확인
    if (!files.length) {
      console.error("No files detected!");
      return;
    }

    // 더미 데이터 사용
    const dummyResponse = {
      data: {
        filename: "dummy_image_" + Date.now() + ".jpg",
      },
    };

    try {
      console.log("API Response:", dummyResponse.data);
      onImageChange([...images, dummyResponse.data.filename]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  
  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div className="flex gap-4">
      <Dropzone
        onDrop={(files) => {
          console.log("onDrop triggered");
          console.log("Files:", files);
          handleDrop(files);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            {...getRootProps({
              onClick: (e) => {
                e.preventDefault();
                console.log("Dropzone clicked", e);
              },
            })}
            className="min-w-[300px] h-[300px] border flex items-center justify-center"
          >
            <input {...getInputProps()} />
            <p className="text-3xl">+</p>
          </section>
        )}
      </Dropzone>

      <Upload
        beforeUpload={handleUpload} // 업로드 처리
        showUploadList={false} // 기본 업로드 목록 숨김
      >
        <Button icon={<UploadOutlined />}>이미지 업로드</Button>
      </Upload>
      
      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`https://via.placeholder.com/300?text=${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
*/

/*import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axiosInstance from '../utils/axios';

const FileUpload = ({ onImageChange, images }) => {
    const handleDrop = async (files) => {
        console.log('Dropped files:', files); // 파일 배열 확인
        let formData = new FormData();
        formData.append('file', files[0]);
      
        console.log('FormData content:', formData.get('file')); // FormData 확인

        if (!files.length) {
            console.error('No files detected!');
            return;
          }
          console.log('Files dropped:', files);
      
        try {
          const response = await axiosInstance.post('/products/image', formData, {
            header: { 'content-type': 'multipart/form-data' },
          });
          console.log('API Response:', response.data); // API 응답 확인
          onImageChange([...images, response.data.filename || response.data.fileName]);
        } catch (error) {
          console.error('API Error:', error); // 에러 확인
        }
      };
      
  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div className="flex gap-4">
        <Dropzone
        onDrop={(files) => {
            console.log('onDrop triggered'); // 트리거 확인
            console.log('Files:', files);    // 파일 확인
            handleDrop(files);
        }}
        >
        {({ getRootProps, getInputProps }) => (
            <section
            {...getRootProps({
                onClick: (e) => {
                  e.preventDefault(); // Dropzone 내부에서 기본 동작 방지
                  console.log('Dropzone clicked', e); // 클릭 이벤트 확인
                },
              })}
            className="min-w-[300px] h-[300px] border flex items-center justify-center"
            >
            <input {...getInputProps()} />
            <p className="text-3xl">+</p>
            </section>
        )}
        </Dropzone>


      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes 정의
FileUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired, // 필수 함수 prop
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // 필수 배열 prop (문자열로 구성)
};

export default FileUpload;
*/