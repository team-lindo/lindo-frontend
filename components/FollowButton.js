import { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  
  // 현재 사용자가 해당 게시물 작성자를 팔로우하고 있다면 true
  const isFollowing = !!me?.Followings.some((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollow(post.User.id));
    } else {
      dispatch(follow(post.User.id));
    }
  }, [isFollowing, dispatch, post.User.id]);
  

  // 본인 게시글이면 버튼 렌더링 X 
  if (!me ||Number(post.User.id) === me.id) {
    return null;
  }

  return (
    <Button
      loading={followLoading || unfollowLoading}
      onClick={onClickButton}
      type={isFollowing ? "default" : "primary"} // 팔로우 시 기본, 아닐 때 primary
      style={{
        backgroundColor: isFollowing ? "#f0f0f0" : "#1890ff", // 언팔로우 시 회색, 팔로우 시 파란색
        color: isFollowing ? "#000" : "#fff",
        borderColor: isFollowing ? "#d9d9d9" : "#1890ff",
      }}
    >
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};
FollowButton.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // number 또는 string 허용
    }).isRequired,
  }).isRequired,
};

export default FollowButton;
