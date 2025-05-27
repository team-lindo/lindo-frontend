import Head from 'next/head';
import { List, Input, Tabs, Spin, message } from 'antd';
import Link from "next/link";
import { LeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../reducers/search';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);
console.log("🔍 검색 결과:", results);
console.log("✅ 전체 search state:", useSelector((state) => state.search));

  const handleSearch = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return message.warning("검색어를 입력해주세요.");
    dispatch(searchItems(trimmed));
  };
  
  return (
    <>
    <Head>
      <title>검색</title>
    </Head>
  
    <div style={{ padding: '20px' }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <LeftOutlined style={{ fontSize: "20px" }} />
      </Link>
  
      <Input.Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="검색어를 입력해보세요"
        enterButton="검색"
        onSearch={handleSearch}
        style={{ width: "100%", marginBottom: "24px" }}
      />
  
      {loading ? (
        <Spin tip="로딩 중입니다." spinning={true}>
  <div style={{ height: 100 }} />
</Spin>

      ) : results ? (
        <Tabs defaultActiveKey="hashtags">
<Tabs.TabPane tab="게시글" key="hashtags">
  <List
    dataSource={results.hashtags}
    renderItem={(post) => (
      <List.Item>
        <Link href={`/post/${post.id}`}>{post.content}</Link>
        <Link href={`/post/${post.id}`} legacyBehavior>
          <a>
            <img
              src={post.thumbnail}
              alt="게시글 썸네일"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                objectFit: 'contain',
                display: 'block',
                marginTop: '8px',
                borderRadius: '8px',
                background: '#f5f5f5',
              }}
            />
          </a>
        </Link>
      </List.Item>
    )}
  />
</Tabs.TabPane>

      <Tabs.TabPane tab="상품" key="products">
  <List
    dataSource={results.products}
    renderItem={(product) => (
      <List.Item>
        <Link href={`/product/${product.uid}`}>{product.productName}</Link>
        <Link href={`/product/${product.uid}`} legacyBehavior>
          <a>
            <img
              src={product.thumbnail}
              alt="상품 썸네일"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                objectFit: 'contain',
                display: 'block',
                marginTop: '8px',
                borderRadius: '8px',
                background: '#f5f5f5',
              }}
            />
          </a>
        </Link>
      </List.Item>
    )}
  />
</Tabs.TabPane>

          {/* <Tabs.TabPane tab="브랜드" key="brands">
            <List
              dataSource={result.brands}
              renderItem={(brand) => (
                <List.Item>
                     <Link href={`/product/${product.uid}`}>{brand}</Link>
                  <img
            src={post.thumbnail}
            alt="게시글 썸네일"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          />
                </List.Item>
              )}
            />
          </Tabs.TabPane> */}
        </Tabs>
      ) : null}
    </div>
  </>
  
  );
};

export default SearchPage;
