import { useDispatch } from "react-redux";
import { Form, Input, Button, Select, Typography, Upload, Row, Col, Tag, Tooltip, Card, message } from "antd";
import ImgCrop from "antd-img-crop";
import PropTypes from "prop-types";
import { useState } from "react";
import { categories,addProduct } from "../reducers/product";

import shortId from "shortid";
import { useRouter } from "next/router";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const UploadForm = ({ me }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [fileList, setFileList] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const handleSubmit = async (values) => {
    const id = shortId.generate();

    const user = {
      id: me?.id ?? 1,
      nickname: me?.nickname ?? "익명",
    };

    const product = {
      productName: values.productName,
      category: values.category,
      brand: values.brand,
      price: values.price,
      thumbnail: fileList.length > 0 ? fileList[0].url || fileList[0].response?.url : null,
    };

    const imagesWithTags = fileList.map((file) => ({
      src: file.url || file.response?.url,
      fetchPriority: "auto",
      productInfo:
        product.productName && product.category === selectedCategory
          ? `${product.brand} - ${product.productName} / ${product.price}원 `
          : "",
    }));

    setProductTags(imagesWithTags);

    const post = {
      id,
      user,
      images: imagesWithTags,
      products: [product],
    };

    const result = await dispatch(addProduct(product));

    if (result.meta.requestStatus === "fulfilled") {
      message.success("상품이 옷장에 등록되었습니다!");
      router.push("/closet"); // 옷장 페이지로 이동
    } else {
      message.error("상품 등록 중 오류가 발생했습니다.");
    }
  }
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
    window.open(src);
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card bordered={false} style={{ padding: "20px", marginTop: 20, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Title level={2} style={{ textAlign: "center" }}>상품 업로드</Title>
          
          <Form layout="vertical" onFinish={handleSubmit}>
            {/* 이미지 업로드 */}
            <Form.Item label="이미지 업로드">
              <ImgCrop rotationSlider>
                <Upload.Dragger
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  multiple
                  maxCount={5}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">이미지를 업로드하려면 클릭하거나 드래그하세요.</p>
                </Upload.Dragger>
              </ImgCrop>
            </Form.Item>

            {/* 등록된 제품 태그 */}
            {productTags.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                {productTags.map((tag, index) => (
                  <Tooltip key={index} title="제품 상세 정보 보기">
                    <Tag color="blue" style={{ cursor: "pointer" }} >
                      {tag.productInfo}
                    </Tag>
                  </Tooltip>
                ))}
              </div>
            )}

            {/* 카테고리 */}
            <Form.Item label="카테고리" name="category" rules={[{ required: true }]}>
              <Select placeholder="카테고리를 선택하세요" onChange={setSelectedCategory}>
                {categories
                  .filter((c) => c.name !== "ALL") // ALL 제외
                  .map((cat) => (
                    <Option key={cat.name} value={cat.name}>
                      {cat.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            {/* 브랜드 */}
            <Form.Item label="브랜드" name="brand" rules={[{ required: true }]}>
              <Input placeholder="브랜드를 입력하세요" />
            </Form.Item>

            {/* 제품명 */}
            <Form.Item label="제품명" name="productName" rules={[{ required: true }]}>
              <Input placeholder="제품명을 입력하세요" />
            </Form.Item>

            {/* 가격 */}
            <Form.Item label="가격" name="price" rules={[{ required: true }]}>
              <Input type="number" placeholder="가격을 입력하세요" />
            </Form.Item>

            {/* 등록 버튼 */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                등록하기
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

UploadForm.propTypes = {
  me: PropTypes.object,
};

export default UploadForm;
