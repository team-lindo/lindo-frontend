import { fakeApi, fetchPostsByTaggedProduct} from '../../reducers/user';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Link from 'next/link';
import { Card, List, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

const ProductDetailPage = ({ product, taggedPosts }) => {
  return (
    <>
      <Head>
        <title>{product.name} - 상품 상세</title>
      </Head>
      <AppLayout>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
          <Card
            title={<Title level={3}>{product.name}</Title>}
            cover={
              <img src={product.url} alt={product.name} style={{ maxHeight: 400, objectFit: 'contain' }} />
            }
            variant={false}
          >
            <Paragraph>사이즈: {product.size}</Paragraph>
            <Paragraph>가격: ₩{product.price?.toLocaleString()}</Paragraph>
          </Card>

          <div style={{ marginTop: 40 }}>
            <Title level={4}>이 상품이 태그된 게시글</Title>
            <List
              itemLayout="vertical"
              dataSource={taggedPosts}
              renderItem={(post) => (
                <List.Item
                  key={post.id}
                  style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}
                >
                <Link href={`/post/${post.id}`} legacyBehavior>
                <a style={{ color: 'inherit' }}>
                    <Card
                    hoverable
                    cover={
                        post.Images?.[0] ? (
                            <Image
                            src={post.Images[0].src}
                            alt="썸네일"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '400px',
                              height: 'auto',
                              width: 'auto',
                              objectFit: 'contain',
                              display: 'block',
                              margin: '0 auto',
                              background: '#f5f5f5',
                            }}
                            preview={false}
                          />
                          
                        ) : null
                    }
                    >
                    <Paragraph>{post.content}</Paragraph>
                    </Card>
                </a>
                </Link>
                </List.Item>
              )}
            />
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export const getStaticProps = async (context) => {
  const uid = context.params.uid;
 const result = await fetchPostsByTaggedProduct(uid);
  console.log("📌 태그된 게시글 목록", result.data);
  const productRes = await fakeApi.getProductById(uid);
  //const taggedRes = await fakeApi.getPostsByTaggedProduct(uid);
  return {
    props: {
      product: productRes.data,
      //taggedPosts: taggedRes.data,
      taggedPosts: result.data,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ProductDetailPage;
