import Head from 'next/head';
import { Input } from "antd";
import Link from "next/link";
import { LeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../reducers/search';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  return (
    <>
      <Head>
        <title>search</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
          padding: "20px 0",
          gap: "20px",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <LeftOutlined style={{ fontSize: "20px" }} />
        </Link>

        <Input.Search
          placeholder="검색어를 입력해주세요."
          enterButton="검색"
          onSearch={(value) => dispatch(searchItems({ type: 'hashtag', query: value }))}
          style={{
            width: "80%",
            padding: "10px",
            borderRadius: "5px",
          }}
        />
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p>에러: {error}</p>}

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            {item.name} ({item.type})
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchPage;
