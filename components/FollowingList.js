import { Button, Card, List } from "antd";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const FollowingList = ({ header, data }) => {
  // 스타일 객체를 useMemo로 메모이제이션
  const styles = useMemo(
    () => ({
      list: { marginBottom: 20 },
      loadMore: { textAlign: "center", margin: "10px 0" },
      listItem: { marginTop: 20 },
    }),
    []
  );

  // "더 보기" 버튼
  const loadMoreButton = useMemo(
    () => (
      <div style={styles.loadMore}>
        <Button>더 보기</Button>
      </div>
    ),
    [styles]
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
            actions={[<StopOutlined key="stop" />]} 
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

// PropTypes 개선 및 기본값 설정
FollowingList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired, // 데이터 구조에 명확성 추가
    })
  ).isRequired,
};

export default FollowingList;
