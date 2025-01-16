import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import ImageSlider from "../components/ImageSlider";
import { useState } from "react";
import { Form, Input, Button, Select, Typography, Row, Col, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { updateProduct } from "../reducers/product";

const { Title } = Typography;
const { Option } = Select;

const Closet = ({ addItem }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const user = useSelector((state) => state.user.user); // 로그인한 사용자 정보 가져오기
  const router = useRouter();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleSubmit = async (values) => {
    if (!values.productName.trim()) {
      return alert("상품 이름을 입력하세요!");
    }

    const body = {
      writer: user?.id || "unknown",
      ...values,
      images: fileList.map((file) => file.url || file.response?.url),
    };

    try {
      console.log("Submitting product:", body);
      if (addItem) {
        addItem(product.category, product.productName);
      }
      router.push("/");
    } catch (error) {
      console.error("상품 업로드 실패:", error);
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Head>
        <title>closet</title>
      </Head>
      <AppLayout>
        <section style={{ padding: "20px" }}>
          <Row justify="center">
            <Col span={16}>
              <Title level={2} className="text-center">
                상품 업로드
              </Title>

              <Form
                layout="vertical"
                initialValues={product}
                onFinish={handleSubmit}
              >
                {/* 이미지 업로드 */}
                <Form.Item label="이미지 업로드">
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </Form.Item>

                {/* 카테고리 */}
                <Form.Item
                  label="카테고리"
                  name="category"
                  rules={[{ required: true, message: "카테고리를 선택하세요." }]}
                >
                  <Select
                    placeholder="카테고리를 선택하세요"
                    onChange={(value) =>
                      dispatch(updateProduct({ category: value }))
                    }
                  >
                    <Option value="outer">아우터</Option>
                    <Option value="top">상의</Option>
                    <Option value="bottom">하의</Option>
                  </Select>
                </Form.Item>

                {/* 브랜드 */}
                <Form.Item
                  label="브랜드"
                  name="brand"
                  rules={[{ required: true, message: "브랜드를 입력하세요." }]}
                >
                  <Input
                    placeholder="브랜드를 입력하세요"
                    onChange={(e) =>
                      dispatch(updateProduct({ brand: e.target.value }))
                    }
                  />
                </Form.Item>

                {/* 제품명 */}
                <Form.Item
                  label="제품명"
                  name="productName"
                  rules={[{ required: true, message: "제품명을 입력하세요." }]}
                >
                  <Input
                    placeholder="제품명을 입력하세요"
                    onChange={(e) =>
                      dispatch(updateProduct({ productName: e.target.value }))
                    }
                  />
                </Form.Item>

                {/* 가격 */}
                <Form.Item
                  label="가격"
                  name="price"
                  rules={[{ required: true, message: "가격을 입력하세요." }]}
                >
                  <Input
                    type="number"
                    placeholder="가격을 입력하세요"
                    onChange={(e) =>
                      dispatch(updateProduct({ price: Number(e.target.value) }))
                    }
                  />
                </Form.Item>

                {/* 사이즈 */}
                <Form.Item
                  label="사이즈"
                  name="size"
                  rules={[{ required: true, message: "사이즈를 입력하세요." }]}
                >
                  <Input
                    placeholder="사이즈를 입력하세요"
                    onChange={(e) =>
                      dispatch(updateProduct({ size: e.target.value }))
                    }
                  />
                </Form.Item>

                {/* 구매처 */}
                <Form.Item
                  label="구매처"
                  name="site"
                  rules={[{ required: true, message: "구매처를 입력하세요." }]}
                >
                  <Input
                    placeholder="구매처를 입력하세요"
                    onChange={(e) =>
                      dispatch(updateProduct({ site: e.target.value }))
                    }
                  />
                </Form.Item>

                {/* 설명 */}
                <Form.Item
                  label="설명"
                  name="description"
                  rules={[{ required: true, message: "설명을 입력하세요." }]}
                >
                  <Input.TextArea
                    placeholder="설명을 입력하세요"
                    rows={4}
                    onChange={(e) =>
                      dispatch(updateProduct({ description: e.target.value }))
                    }
                  />
                </Form.Item>

                {/* 등록 버튼 */}
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    등록하기
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </section>
      </AppLayout>
    </>
  );
};

// PropTypes 정의
Closet.propTypes = {
  addItem: PropTypes.func.isRequired, // addItem은 필수 함수형 prop
};

export default Closet;




// import AppLayout from "../components/AppLayout";
// import Head from 'next/head';
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import FileUpload from "../../components/FileUpload";
// import axiosInstance from "../../utils/axios";
// import PropTypes from "prop-types";

//   const Closet = ({ addItem }) => {
//     const [product, setProduct] = useState({
//       category: "outer",
//       brand: "",
//       productName: "",
//       price: 0,
//       size: "",
//       site: "",
//       description: "",
//       images: [],
//     });
  
//     const userData = useSelector((state) => {
//       console.log("Redux State:", state.user); // Redux 상태 확인
//       return state.user?.userData;
//     });
  
//     const navigate = useNavigate();
  
//     // input 변경 핸들러
//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setProduct((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     };
  
//     // 이미지 변경 핸들러
//     const handleImages = (newImages) => {
//       setProduct((prevState) => ({
//         ...prevState,
//         images: newImages,
//       }));
//     };
  
//     // 폼 제출 핸들러
//     const handleSubmit = async (event) => {
//       event.preventDefault();
  
//       if (!product.productName.trim()) {
//         return alert("상품 이름을 입력하세요!");
//       }
  
//       const body = {
//         writer: userData.id,
//         ...product,
//       };
  
//       try {
//         // 서버에 상품 정보 저장
//         await axiosInstance.post("/products", body);
  
//         // 마이페이지로 상품 추가
//         if (addItem) {
//           addItem(product.category, product.productName);
//         }
  
//         // 마이페이지로 이동
//         navigate("/");
//       } catch (error) {
//         console.error("상품 업로드 실패:", error);
//       }
//     };
  
//     return (
//       <section>
//         <div className="text-center m-7 mt-20">
//           <h1 className="text-2xl font-bold">상품 업로드</h1>
//         </div>
  
//         <form className="mt-6" onSubmit={handleSubmit}>
//           {/* 이미지 업로드 컴포넌트 */}
//           <FileUpload images={product.images} onImageChange={handleImages} />
  
//           {/* 카테고리 */}
//           <div className="mt-4">
//             <label htmlFor="category" className="block text-lg font-medium mb-2">
//               카테고리
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-white border rounded-md"
//             >
//               <option value="outer">아우터</option>
//               <option value="top">상의</option>
//               <option value="bottom">하의</option>
//             </select>
//           </div>
  
//           {/* 브랜드 */}
//           <div className="mt-4">
//             <label htmlFor="brand" className="block text-lg font-medium mb-2">
//               브랜드
//             </label>
//             <input
//               id="brand"
//               name="brand"
//               value={product.brand}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-white border rounded-md"
//             />
//           </div>
  
//           {/* 제품명 */}
//           <div className="mt-4">
//             <label
//               htmlFor="productName"
//               className="block text-lg font-medium mb-2"
//             >
//               제품명
//             </label>
//             <input
//               id="productName"
//               name="productName"
//               value={product.productName}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-white border rounded-md"
//             />
//           </div>
  
//           {/* 가격 */}
//           <div className="mt-4">
//             <label htmlFor="price" className="block text-lg font-medium mb-2">
//               가격
//             </label>
//             <input
//               id="price"
//               name="price"
//               type="number"
//               value={product.price}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-white border rounded-md"
//             />
//           </div>
  
//           {/* 사이즈 */}
//           <div className="mt-4">
//             <label htmlFor="size" className="block text-lg font-medium mb-2">
//               사이즈
//             </label>
//             <input
//               id="size"
//               name="size"
//               value={product.size}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-white border rounded-md"
//             />
//           </div>
  
//           {/* 구매처 */}
//           <div className="mt-4">
//             <label htmlFor="site" className="block text-lg font-medium mb-2">
//               구매처
//             </label>
//             <input
//               id="site"
//               name="site"
//               value={product.site}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-white border rounded-md"
//             />
//           </div>
  
//           {/* 설명 */}
//           <div className="mt-4">
//             <label
//               htmlFor="description"
//               className="block text-lg font-medium mb-2"
//             >
//               설명
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-200 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//           </div>
  
//           {/* 등록 버튼 */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
//             >
//               등록하기
//             </button>
//           </div>
//         </form>
//       </section>
//     );
//   };
  
//   // PropTypes 정의
//   Closet.propTypes = {
//     addItem: PropTypes.func.isRequired, // addItem은 필수 함수형 prop
//   };
  
// export default Closet;
// 