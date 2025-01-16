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




