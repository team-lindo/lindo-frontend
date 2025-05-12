// pages/search.js

import Head from 'next/head';
import { Input, message } from "antd";
import Link from "next/link";
import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return message.warning("검색어를 입력해주세요.");
    }
    router.push(`/hashtag/${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <Head>
        <title>검색</title>
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="검색어를 입력해보세요"
          enterButton="검색"
          onSearch={handleSearch}
          style={{ width: "80%", padding: "10px", borderRadius: "5px" }}
        />
      </div>
    </>
  );
};

export default SearchPage;
