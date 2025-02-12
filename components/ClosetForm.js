import { useDispatch } from "react-redux";
import { Form, Input, Button, Select, Typography, Upload, Row, Col } from "antd";
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

  const handleSubmit = async (values) => {
    const id = shortId.generate();

    if (!values.description.trim() || !values.productName.trim()) {
      return alert("필수 정보를 입력하세요!");
    }

    const post = {
      id,
      description: values.description,
      productName: values.productName,
      category: values.category,
      brand: values.brand,
      price: values.price,
      size: values.size,
      site: values.site,
      writer: me?.id || "unknown",
      images: fileList.map((file) => file.url || file.response?.url),
    };

    const result = await dispatch(addPost({ id, text: post }));

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

            {/* 카테고리 */}
            <Form.Item
              label="카테고리"
              name="category"
              rules={[{ required: true, message: "카테고리를 선택하세요." }]}
            >
              <Select
                placeholder="카테고리를 선택하세요"
                onChange={(value) => dispatch(updateProduct({ category: value }))}
              >
                <Option value="outer">아우터</Option>
                <Option value="top">상의</Option>
                <Option value="bottom">하의</Option>
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

            {/* 구매처 */}
            <Form.Item label="구매처" name="site" rules={[{ required: true }]}>
              <Input placeholder="구매처를 입력하세요" />
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
