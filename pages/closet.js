import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import ImageSlider from "../components/ImageSlider";
import { useEffect, useState, useCallback, useRef } from "react";
import { Form, Input, Button, Select, Typography, Row, Col, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { updateProduct } from "../reducers/product";
const { Title } = Typography;
const { Option } = Select;
import useInput from '../hooks/useInput';
import { addPostToMe } from "../reducers/user";
import postSlice, {addPostDone, addPost, uploadImage } from '../reducers/post';
import shortId from 'shortid';

const Closet = ({ addItem }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const product = useSelector((state) => state.product.product);

  const [text, onChangeText, setText] = useInput('');
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [newPost, setNewPost] = useState(null);

  useEffect(() => {
    if (!me || !me.Posts) {
      console.error('사용자 정보가 없습니다. 로그인이 필요합니다.');
      return;
    }
    if (addPostDone&& newPost) {
      console.log('게시물 추가 완료');
      dispatch(addPostToMe(newPost.id)); // me가 있을 때만 호출
      dispatch(resetAddPostDone());
    }
  }, [addPostDone, dispatch, setText, me, newPost]);

  
  const handleSubmit = async (values) => {
    const id = shortId.generate();

    console.log('Form Values:', values); // 디버깅

    if (!values.description.trim()) {
      return alert("설명을 입력하세요!");
    }
    if (!values.productName.trim()) {
      return alert("상품 이름을 입력하세요!");
    }

    const Post = {
      id,
      description: values.description,
      productName: values.productName,
      category: values.category,
      brand: values.brand,
      price: values.price,
      size: values.size,
      site: values.site,
      writer: me?.id || 'unknown',
      images: fileList.map((file) => file.url || file.response?.url),
    };

    console.log('New Post:', Post); // 디버깅
  /*  dispatch(addPost(Post));
    dispatch(addPostToMe(Post.id)); // 게시물을 사용자 정보에 추가
    // addPost 및 addPostToMe 동시 디스패치
   */
    const result = await dispatch(addPost({ id, text: Post }));

    if (result.meta.requestStatus === 'fulfilled') {
      console.log('addPost 성공');
      dispatch(addPostToMe(Post.id)); // addPost 성공 시에만 addPostToMe 호출
      console.log("addPostToMe payload:", Post.id); // Post.id 직접 출력

      router.push('/'); // 성공적으로 완료된 후 이동
    } else {
      console.error('addPost 실패:', result.error.message);
      alert('게시물 추가 중 오류가 발생했습니다.');
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
                onFinish={(values) => {
                  console.log('Form Data Submitted:', values); // 입력 데이터 확인
                  handleSubmit(values); 
                }}             
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
                    onChange={(e) => {
                      const formData = new FormData();
                      formData.append('description', e.target.value);
                      console.log('FormData Description:', formData.get('description'));
                      console.log('FormData Description:', e.target.value); // 실시간 값 확인

                      dispatch(updateProduct({ description: e.target.value }));
                    }}
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

Closet.propTypes = {
  addItem: PropTypes.func, // 필수 조건 제거
};

export default Closet; 