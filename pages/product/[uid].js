import { fakeApi, fetchPostsByTaggedProduct} from '../../reducers/user';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Link from 'next/link';
import { Card, List, Typography, Image } from 'antd';
import { useRouter, useMemo, } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../reducers/product';

const { Title, Paragraph } = Typography;

const ProductDetailPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.product);
  const taggedPosts = useSelector((state) => state.post.taggedPosts); 
const {  getProductError } = useSelector((state) => state.product);

  if (getProductError) return <p>상품 정보를 불러오는 데 실패했습니다.</p>;
//if (!product || String(product.uid) !== String(uid)) return <p>로딩 중...</p>;
if (
  !product ||
  String(product.uid).split('_')[1] !== String(uid)
) return <p>로딩 중...</p>;

  useEffect(() => {
  console.log('🧾 [ProductDetailPage] 현재 product:', product);
}, [product]);


  console.log('🧾 router uid:', uid);
console.log('🧾 product.uid:', product?.uid);

  return (
    <>
      <Head>
        <title>{product.productName} - 상품 상세</title>
      </Head>
      <AppLayout>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
          <Card
            title={<Title level={3}>{product.productName}</Title>}
            cover={
              <img src={product.thumbnail} alt={product.productName} style={{ maxHeight: 400, objectFit: 'contain' }} />
            }
            variant={false}
          >
            <Paragraph>가격: ₩{product.price?.toLocaleString()}</Paragraph>
          </Card>

<div style={{ marginTop: 40 }}>
  <Title level={4}>이 상품이 태그된 게시글</Title>

  {taggedPosts?.length === 0 ? (
    <Paragraph>이 상품이 태그된 게시글이 아직 없습니다.</Paragraph>
  ) : (
    <List
      itemLayout="vertical"
      dataSource={taggedPosts}
      renderItem={(post) => {
        const transformedPost = {
          ...post,
          images: post.images?.map((src, index) => ({
            id: String(index),
            src,
          })),
          taggedProductsByImage: Object.fromEntries(
            (post.taggedProducts || []).map(tp => [String(tp.imageId), tp.tags])
          ),
        };

        return (
          <List.Item
            key={post.id}
            style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}
          >
            <Link href={`/post/${post.id}`} legacyBehavior>
              <a style={{ color: 'inherit' }}>
                <Card
                  hoverable
                  cover={
                    transformedPost?.images?.length > 0 ? (
                      <PostImages
                        images={transformedPost.images}
                        taggedProductsByImage={transformedPost.taggedProductsByImage}
                      />
                    ) : post?.images?.length > 0 ? (
                      <img
                        src={post.images[0]}
                        alt="썸네일"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          display: 'block',
                          marginBottom: '16px',
                        }}
                      />
                    ) : null
                  }
                >
                  <Paragraph>{post.content}</Paragraph>
                </Card>
              </a>
            </Link>
          </List.Item>
        );
      }}
    />
  )}
</div>

        </div>
      </AppLayout>
    </>
  );
};



export default ProductDetailPage;
