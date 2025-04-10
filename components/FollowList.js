import { Button, Card, List, Avatar, Skeleton, Divider } from "antd";
import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

const FollowList = ({ header, data = [] }) => {
  const [followStatus, setFollowStatus] = useState(
    data.reduce((acc, user) => {
      acc[user.id] = true;
      return acc;
    }, {})
  );

  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState(data);

  useEffect(() => {
    setLoadedData(data);
  }, [data]);

  const [page, setPage] = useState(1);
  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const nextData = data.slice(page * 10, (page + 1) * 10);
      setLoadedData((prev) => [...prev, ...nextData]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const onFollowToggle = (id) => {
    setFollowStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const styles = useMemo(
    () => ({
      list: { marginBottom: 20 },
      listItem: { marginTop: 20 },
    }),
    []
  );

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={loadedData.length}
        next={loadMoreData}
        hasMore={loadedData.length < data.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>더 이상 데이터가 없습니다.</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          style={styles.list}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size="small"
          header={<div>{header}</div>}
          bordered
          dataSource={loadedData}
          renderItem={(item) => (
            <List.Item style={styles.listItem} key={item.id}>
              <Link href={`/user/${item.id}`}>
                <Card
                  hoverable
                  onClick={(e) => e.stopPropagation()}
                  actions={[
                    <Button
                      key="follow-button"
                      type={followStatus[item.id] ? "primary" : "default"}
                      danger={followStatus[item.id]}
                      onClick={(e) => {
                        e.preventDefault(); // 링크 이동 방지
                        e.stopPropagation(); // 카드 클릭도 막기
                        onFollowToggle(item.id);
                      }}
                    >
                      {followStatus[item.id] ? "언팔로우" : "팔로우"}
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar src={`https://i.pravatar.cc/150?u=${item.id}`} />}
                    title={item.nickname}
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
