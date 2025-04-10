import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Avatar } from "antd";
import Link from "next/link";
import { fakeApi } from "../reducers/user"; // 유저 API (더미 또는 실제)
import Image from "next/image";

const OtherUserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [postsVisible, setPostsVisible] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fakeApi.getUserById(id);
        if (res?.data) setUser(res.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p style={{ padding: "20px" }}>유저 정보를 불러오는 중입니다...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        actions={[
          <div
            key="post"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setPostsVisible((prev) => !prev)}
          >
            게시물<br />{user?.Posts?.length || 0}
          </div>,
          <div key="closet">
            <Link href={`/closet/${user.id}`}>
              <span style={{ cursor: "pointer", color: "blue" }}>
                옷장<br />보기
              </span>
            </Link>
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{user?.nickname?.[0] || "U"}</Avatar>}
          title={user?.nickname || "익명"}
          description="유저 프로필"
        />
      </Card>

      {postsVisible && user.Posts?.length > 0 && (
        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {user.Posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Image
                  src={post.Images?.[0]?.src || "/default-image.png"}
                  alt="post thumbnail"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherUserProfile;
