import { Button, Card, List } from "antd";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const FollowList = ({ header, data }) => {
  const styles = useMemo(
    () => ({
      list: { marginBottom: 20 },
      loadMore: { textAlign: "center", margin: "10px 0" },
      listItem: { marginTop: 20 },
    }),
    []
  );

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
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.defaultProps = {
  data: [],
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
