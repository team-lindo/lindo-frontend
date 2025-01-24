
import Head from 'next/head';
import { Input, Space } from "antd";
import Link from "next/link";
import { LeftOutlined } from '@ant-design/icons';
const onSearch = (value, _e, info) => console.log(info?.source, value);
const { Search } = Input;

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>search</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 가로 중앙 정렬
          alignItems: "center", // 세로 중앙 정렬
          height: "20vh", // 컨테이너 높이
          padding: "20px 0", // 위아래 여백
          gap: "20px", // 아이콘과 검색창 사이 간격
        }}
      >
        {/* 아이콘 */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <LeftOutlined style={{ fontSize: "20px" }} />
        </Link>


        <Input.Search
          placeholder="검색어를 입력해주세요."
          style={{
            width: "80%", // 너비 80% 설정
            padding: "10px", // 내부 여백
            borderRadius: "5px", // 모서리 둥글게
          }}
        />
      </div>
    </>
  );
};

export default SearchPage;
