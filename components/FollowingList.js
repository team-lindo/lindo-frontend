import { Button, Card, List } from "antd";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFollowings, follow, unfollow,loadMyInfo } from "../reducers/user";

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
  console.log("🧩 현재 팔로우 상태:", isCurrentlyFollowing); // ✅ 현재 상태

  try {
    if (isCurrentlyFollowing) {
      console.log("🔁 언팔로우 요청:", id);
      await dispatch(unfollow(id)).unwrap();
    } else {
      console.log("🔁 팔로우 요청:", id);
      await dispatch(follow(id)).unwrap();

      console.log("🔄 loadMyInfo()로 me 갱신 중...");
      await dispatch(loadMyInfo()).unwrap();
    }

    setFollowStatus((prev) => {
      const updated = {
        ...prev,
        [id]: !prev[id],
      };
      console.log("✅ 토글된 followStatus 상태:", updated); // ✅ 변경된 followStatus 출력
      return updated;
    });
  } catch (error) {
    console.error("❌ 팔로우 토글 실패:", error);
  }
};


  // 더 보기 버튼
const handleLoadMore = async () => {
  if (loading || data.length >= totalCount) return;
  setLoading(true);
  try {
    const res = await dispatch(loadFollowings({ offset })).unwrap();
    const newUsers = res.users || [];
    setOffset((prev) => prev + newUsers.length);
  } catch (e) {
    console.error("🚨 loadFollowings 실패:", e);
  }
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
