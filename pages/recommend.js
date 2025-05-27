// pages/recommend.js
import { Card } from "antd";
import AppLayout from "../components/AppLayout";
import FollowButton from "../components/FollowButton";

// ✅ 더미 데이터로 직접 구성
const recommendedUsers = [
  { id: 5, nickname: "test1", email: "test1@example.com" },
//   { id: 3, nickname: "test2", email: "test2@example.com" },
//   { id: 4, nickname: "test3", email: "test3@example.com" },
  // { id: 8, nickname: "test8", email: "test48example.com" },
];

const RecommendPage = () => {
  return (
    <AppLayout>
      <h2 style={{ marginBottom: 16 }}>팔로우 추천</h2>
      <Card title="회원 목록">
        {recommendedUsers.map((user) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{user.nickname}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>{user.email}</div>
            </div>
<FollowButton userId={user.id} />     
    </div>
        ))}
      </Card>
    </AppLayout>
  );
};

export default RecommendPage;
