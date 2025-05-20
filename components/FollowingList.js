import { Button, Card, List } from "antd";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFollowings, follow, unfollow } from "../reducers/user";

const FollowingList = ({ header, data = [], totalCount = 0 }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(data.length);

  // followStatus를 유저 ID별로 true/false로 저장
  const [followStatus, setFollowStatus] = useState(
    data.reduce((acc, user) => {
      acc[user.id] = true; // 기본은 "팔로우 중" 상태
      return acc;
    }, {})
  );

  useEffect(() => {
    // data가 바뀌면 followStatus도 동기화
    setFollowStatus(
      data.reduce((acc, user) => {
        acc[user.id] = true;
        return acc;
      }, {})
    );
  }, [data]);

  // 팔로우/언팔로우 토글
  const onFollowToggle = async (id) => {
    const isCurrentlyFollowing = followStatus[id];

    try {
      if (isCurrentlyFollowing) {
        await dispatch(unfollow(id)).unwrap();
      } else {
        await dispatch(follow(id)).unwrap();
      }

      setFollowStatus((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    } catch (error) {
      console.error("팔로우 토글 실패:", error);
    }
  };

  // 더 보기 버튼
  const handleLoadMore = async () => {
    if (loading || data.length >= totalCount) return;
    setLoading(true);
    await dispatch(loadFollowings({ offset }));
    setOffset((prev) => prev + 10);
    setLoading(false);
  };

  const styles = useMemo(
    () => ({
      list: { marginBottom: 20 },
      loadMore: { textAlign: "center", margin: "10px 0" },
      listItem: { marginTop: 20 },
    }),
    []
  );

  const loadMoreButton = useMemo(
    () =>
      data.length < totalCount ? (
        <div style={styles.loadMore}>
          <Button loading={loading} onClick={handleLoadMore}>
            더 보기
          </Button>
        </div>
      ) : null,
    [loading, data.length, totalCount]
  );

  return (
    <List
      style={styles.list}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={loadMoreButton}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={styles.listItem}>
          <Card
            actions={[
              <StopOutlined
                key="stop"
                onClick={() => onFollowToggle(item.id)}
              />,
            ]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};


FollowingList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default FollowingList;
