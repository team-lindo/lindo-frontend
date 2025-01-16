import FollowList from "../components/FollowList";

const FollowListPage = () => {
  // 가짜 데이터
  const followers = [
    { nickname: "Follower1" },
    { nickname: "Follower2" },
    { nickname: "Follower3" },
  ];

  return (
    <div>
      <h1>팔로워 목록</h1>
      <FollowList header="팔로워 목록" data={followers} />
    </div>
  );
};

export default FollowListPage;
