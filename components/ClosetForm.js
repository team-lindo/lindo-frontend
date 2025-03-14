import { useDispatch } from "react-redux";
import { Form, Input, Button, Select, Typography, Upload, Row, Col, Tag, Tooltip } from "antd";
import ImgCrop from "antd-img-crop";
import PropTypes from "prop-types";
import { useState } from "react";
import { updateProduct } from "../reducers/product";
import { addPost } from "../reducers/post";
import { addPostToMe } from "../reducers/user";
import shortId from "shortid";
import { useRouter } from "next/router";

const { Title } = Typography;
const { Option } = Select;

const ClosetForm = ({ me }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [fileList, setFileList] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리

  const handleSubmit = async (values) => {
    const id = shortId.generate();
  
    if (!values.description || !values.description.trim()) {
      return alert("필수 정보를 입력하세요!");
    }
  
    // 🚀 user 객체 수정: 항상 `id`와 `nickname`이 존재하도록 설정
    const user = {
      id: me?.id ?? 1, // 기본값 1
      nickname: me?.nickname ?? "익명",
    };
  
    // 제품 정보 객체 생성
    const product = {
      productName: values.productName,
      category: values.category,
      brand: values.brand,
      price: values.price,
      size: values.size,
      siteUrl: values.siteUrl,
      description: values.description?.trim() || "제품 설명이 없습니다.", // 🚀 description 추가
      imageTag: fileList.length > 0 ? fileList[0].url || fileList[0].response?.url : null,
    };
  
    // 이미지 태그에 제품 정보 포함
    const imagesWithTags = fileList.map((file) => ({
      src: file.url || file.response?.url,
      fetchPriority: "auto",
      productInfo:
        product.productName && product.category === selectedCategory
          ? `${product.brand} - ${product.productName} / ${product.price}원 / ${product.size}`
          : "",
      siteUrl: product.siteUrl || "",
    }));
  
    // 제품 태그 상태 업데이트
    setProductTags(imagesWithTags);
  
    const post = {
      id,
      user, // ✅ user 객체에 올바른 값 전달
      description: values.description?.trim() || "설명이 없습니다.", // ✅ description 올바르게 전달
      images: imagesWithTags,
      products: [product],
    };
  
    //console.log("🚀 Sending post data:", post); 
  
    const result = await dispatch(addPost(post));
  
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(addPostToMe(post.id));
      router.push("/");
    } else {
      alert("게시물 추가 중 오류가 발생했습니다.");
    }
  };
  

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.map((file) => ({ ...file, fetchPriority: undefined })));
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
    <section style={{ padding: "20px" }}>
      <Row justify="center">
        <Col span={16}>
          <Title level={2} className="text-center">상품 업로드</Title>
          <Form layout="vertical" onFinish={handleSubmit}>
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

            {/* 등록된 제품 태그 (선택한 카테고리에 맞는 제품만 표시) */}
            <div style={{ marginBottom: "20px" }}>
              {productTags.map((tag, index) => (
                <Tooltip key={index} title="제품 상세 정보 보기">
                  <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => window.open(tag.siteUrl, "_blank")}>
                    {tag.productInfo}
                  </Tag>
                </Tooltip>
              ))}
            </div>

            {/* 카테고리 */}
            <Form.Item
              label="카테고리"
              name="category"
              rules={[{ required: true, message: "카테고리를 선택하세요." }]}
            >
              <Select
                placeholder="카테고리를 선택하세요"
                onChange={(value) => {
                  setSelectedCategory(value); // 선택한 카테고리 상태 업데이트
                  dispatch(updateProduct({ category: value }));
                }}
              >
                <Option value="outer">아우터</Option>
                <Option value="top">상의</Option>
                <Option value="bottom">하의</Option>
                <Option value="bag">가방</Option>
                <Option value="shoes">신발</Option>
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

            {/* 사이즈 */}
            <Form.Item label="사이즈" name="size" rules={[{ required: true }]}>
              <Input placeholder="사이즈를 입력하세요" />
            </Form.Item>

            {/* 구매 링크 */}
            <Form.Item label="구매 링크" name="siteUrl">
              <Input placeholder="제품 구매 링크를 입력하세요 (선택 사항)" />
            </Form.Item>

            {/* 설명 */}
            <Form.Item label="설명" name="description" rules={[{ required: true }]}>
              <Input.TextArea placeholder="설명을 입력하세요" rows={4} />
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
  );
};

ClosetForm.propTypes = {
  me: PropTypes.object,
};

export default ClosetForm;
